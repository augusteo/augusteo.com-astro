/**
 * Generates a static paper noise texture PNG
 * This replaces the SVG feTurbulence filter which is computed on every repaint
 *
 * Run with: node scripts/generate-noise-texture.js
 */

import sharp from 'sharp';

const SIZE = 128; // Smaller tile that will repeat - reduces file size

// Generate fractal noise data (grayscale)
const pixels = Buffer.alloc(SIZE * SIZE);

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const i = y * SIZE + x;

    // Multi-octave noise (similar to feTurbulence with numOctaves=4)
    let noise = 0;
    let amplitude = 1;
    let frequency = 0.9; // baseFrequency from the SVG

    for (let octave = 0; octave < 4; octave++) {
      // Simple pseudo-random noise using sine
      const nx = x * frequency;
      const ny = y * frequency;
      const n = Math.sin(nx * 12.9898 + ny * 78.233) * 43758.5453;
      noise += (n - Math.floor(n)) * amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }

    // Normalize to 0-255 grayscale, quantize to 32 levels for better compression
    const value = Math.floor(noise * 128);
    pixels[i] = Math.floor(value / 8) * 8; // Reduce to 32 gray levels
  }
}

// Create grayscale PNG using sharp with maximum compression
await sharp(pixels, {
  raw: {
    width: SIZE,
    height: SIZE,
    channels: 1
  }
})
  .png({
    compressionLevel: 9,
    palette: true // Use indexed color for smaller file size
  })
  .toFile('./public/textures/paper-noise.png');

console.log(`Generated paper-noise.png (${SIZE}x${SIZE})`);
