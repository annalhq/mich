import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
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

const codeOptions = {
  theme: "one-dark-pro",
  keepBackground: true,
  grid: true,
};

export default defineConfig({
  root: "content",
  collections: { posts, spaces },
  mdx: {
    remarkPlugins: [remarkGfm, remarkImages],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, codeOptions],
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
    recmaPlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});
