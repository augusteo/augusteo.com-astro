import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const site = context.site!.toString().replace(/\/$/, "");

  return rss({
    title: "Victor Augusteo",
    description: "Personal blog about travels, tech, books, and philosophy",
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => {
        const slug = post.id.includes("/") ? post.id.split("/")[0] : post.id;
        // Render markdown to HTML, rewrite @assets paths to absolute URLs
        const rawHtml = parser.render(post.body ?? "");
        const html = rawHtml.replace(
          /@assets\/blog\//g,
          `${site}/assets/blog/`
        );
        const content = sanitizeHtml(html, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        });

        return {
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description,
          link: `/blog/${slug}/`,
          content,
        };
      }),
  });
}
