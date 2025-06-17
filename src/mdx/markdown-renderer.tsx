/* eslint-disable */
import "katex/dist/katex.min.css";
import { MarkdownAsync } from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypekatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import FootnoteForwardReference from "@/components/footnote/forward-reference";

/* my custom components */
import Link from "@/components/link";
import { cn } from "@/lib/utils";

import { MetaConfig } from "./utils/mdx";

/* eslint-disable */

interface MarkdownRendererProps {
  content: string;
  meta?: MetaConfig;
}

export function MarkdownRenderer({ content, meta }: MarkdownRendererProps) {
  return (
    <MarkdownAsync
      className={cn("markdown prose-zinc max-w-none dark:prose-invert", {
        "markdown-no-list-margin": meta?.styling?.listExtraPadding === false,
      })}
      remarkPlugins={[
        remarkGfm,
        remarkFrontmatter,
        remarkDirective,
        remarkMath,
      ]}
      rehypePlugins={[
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: "linked-heading",
            },
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: "catppuccin-macchiato",
            keepBackground: false,
          },
        ],
        rehypeRaw,
        rehypekatex,
      ]}
      components={{
        a: ({ children, href }) => {
          if (href?.startsWith("#user-content-fn-")) {
            return (
              <FootnoteForwardReference href={href}>
                {children}
              </FootnoteForwardReference>
            );
          }
          return <Link href={href}>{children}</Link>;
        },
      }}
    >
      {content}
    </MarkdownAsync>
  );
}
