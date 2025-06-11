/* eslint-disable */
import ReactMarkdown from "react-markdown";
import { MarkdownAsync } from "react-markdown";
import { Tweet } from "react-tweet";
import rehypeMathJax from "rehype-mathjax";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

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
        remarkMath,
        remarkFrontmatter,
        remarkDirective,
      ]}
      rehypePlugins={[
        rehypeMathJax,
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
      ]}
      components={{
        a: ({ href, children }) => {
          if (
            href?.startsWith("https://twitter.com")
            //|| href?.startsWith("https://x.com") // for ssmax blog disabling, as it is rendering it in reference section & also add nested linkgings [[]()]()
          ) {
            return <Tweet id={href.split("/").pop() || ""} />;
          }
          return (
            <a
              href={href}
              // target="_blank"
              rel="noopener noreferrer"
              className="!text-blue-500 no-underline transition-colors hover:!text-blue-600 dark:!text-blue-400 dark:hover:!text-blue-300"
            >
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </MarkdownAsync>
  );
}
