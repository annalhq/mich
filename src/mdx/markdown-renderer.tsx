/* eslint-disable */

/* katex styles */
import "katex/dist/katex.min.css";
import { MarkdownAsync } from "react-markdown";
import rehypekatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import FootnoteBackReference from "@/components/footnote/back-reference";
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
        [
          rehypePrettyCode,
          {
            theme: {
              dark: "github-dark",
              light: "github-light",
            },
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
          return (
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-muted"
              underline
            >
              {children}
            </Link>
          );
        },
      }}
    >
      {content}
    </MarkdownAsync>
  );
}
