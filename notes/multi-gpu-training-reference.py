"""
Reference implementation for the multi-GPU training explainer.

What each mode shows:
  solo  -- the single-GPU loop. Forward, loss, backward, optimizer.
  ddp   -- DistributedDataParallel. Each rank holds the full model. backward()
           triggers an all-reduce on gradients (averaged across ranks).
  fsdp  -- FSDP2 (fully_shard). Each rank holds only a 1/N slice of each layer.
           forward() all-gathers params layer-by-layer; backward() reduce-scatters
           gradients back to per-rank shards and re-all-gathers params for the
           backward matmul.

CPU-only via gloo. Run on a Mac, no cluster needed.

  python reference.py --mode=solo
  torchrun --nproc_per_node=2 --standalone reference.py --mode=ddp
  torchrun --nproc_per_node=2 --standalone reference.py --mode=fsdp
"""
import argparse
import os
import torch
import torch.distributed as dist
import torch.nn as nn


class TinyMLP(nn.Module):
    def __init__(self, in_dim=64, hidden=256, out_dim=64):
        super().__init__()
        self.fc1 = nn.Linear(in_dim, hidden)
        self.fc2 = nn.Linear(hidden, out_dim)

    def forward(self, x):
        return self.fc2(torch.relu(self.fc1(x)))


def init_dist():
    rank = int(os.environ.get("RANK", "0"))
    world = int(os.environ.get("WORLD_SIZE", "1"))
    if world > 1:
        dist.init_process_group(backend="gloo", rank=rank, world_size=world)
    return rank, world


def log(rank, world, msg):
    print(f"[r{rank}/{world}] {msg}", flush=True)


def param_bytes(model):
    total = 0
    for p in model.parameters():
        # FSDP2 shards live on `_local_tensor` once sharded; .numel() reports
        # the local shard size after `fully_shard` runs.
        total += p.numel() * p.element_size()
    return total


def total_params(model):
    return sum(p.numel() for p in model.parameters())


def step(model, rank):
    optim = torch.optim.AdamW(model.parameters(), lr=1e-3)
    torch.manual_seed(42 + rank)
    x = torch.randn(8, 64)
    y = torch.randn(8, 64)
    pred = model(x)
    loss = ((pred - y) ** 2).mean()
    loss.backward()
    optim.step()
    return loss.item()


def run_solo():
    rank, world = init_dist()
    model = TinyMLP()
    log(rank, world, f"solo: {total_params(model)} params, "
                     f"{param_bytes(model)/1e6:.3f} MB on this rank")
    loss = step(model, rank)
    log(rank, world, f"solo step done, loss={loss:.4f}")


def run_ddp():
    from torch.nn.parallel import DistributedDataParallel as DDP
    rank, world = init_dist()
    model = TinyMLP()
    log(rank, world, f"ddp pre-wrap: {total_params(model)} params, "
                     f"{param_bytes(model)/1e6:.3f} MB on every rank")
    model = DDP(model)
    log(rank, world, "ddp wrapped: backward() will all-reduce grads in buckets")
    loss = step(model, rank)
    log(rank, world, f"ddp step done, loss={loss:.4f} (grads averaged across ranks)")
    if world > 1:
        dist.destroy_process_group()


def run_fsdp():
    rank, world = init_dist()
    model = TinyMLP(in_dim=64, hidden=512, out_dim=64)
    pre = param_bytes(model) / 1e6
    log(rank, world, f"fsdp pre-shard: {total_params(model)} params, {pre:.3f} MB per rank")
    try:
        from torch.distributed.fsdp import fully_shard
        # FSDP2: shard each leaf module then the root
        fully_shard(model.fc1)
        fully_shard(model.fc2)
        fully_shard(model)
        api = "FSDP2 (fully_shard)"
    except ImportError:
        from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
        model = FSDP(model)
        api = "FSDP1 (FullyShardedDataParallel)"
    post = param_bytes(model) / 1e6
    log(rank, world, f"fsdp post-shard ({api}): {post:.3f} MB per rank, "
                     f"world_size={world}, ratio={pre/post:.2f}x")
    loss = step(model, rank)
    log(rank, world, f"fsdp step done, loss={loss:.4f} "
                     f"(forward all-gathered params, backward reduce-scattered grads)")
    if world > 1:
        dist.destroy_process_group()


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--mode", choices=["solo", "ddp", "fsdp"], default="solo")
    args = p.parse_args()
    {"solo": run_solo, "ddp": run_ddp, "fsdp": run_fsdp}[args.mode]()


if __name__ == "__main__":
    main()
