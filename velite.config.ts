import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
  name: "posts",
  pattern: "content/blog/**/*.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    date: s.string(),
    tags: s.array(s.string()).optional(),
    draft: s.boolean().optional(),
    content: s.mdx(),
  }),
});

const spaces = defineCollection({
  name: "spaces",
  pattern: "content/space/**/*.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    date: s.string(),
    tags: s.array(s.string()).optional(),
    draft: s.boolean().optional(),
    content: s.mdx(),
  }),
});

export default defineConfig({
  root: "content",
  collections: { posts, spaces },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
