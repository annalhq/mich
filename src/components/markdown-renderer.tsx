/* eslint-disable */
"use client";

import ReactMarkdown from "react-markdown";
import { Tweet } from "react-tweet";
import rehypeMathJax from "rehype-mathjax";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { Code } from "./code-component";

/* eslint-disable */

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className="markdown prose-zinc max-w-none dark:prose-invert"
      remarkPlugins={[
        remarkGfm,
        remarkMath,
        remarkFrontmatter,
        remarkDirective,
      ]}
      rehypePlugins={[rehypeMathJax]}
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
              target="_blank"
              rel="noopener noreferrer"
              className="!text-zinc-400 no-underline transition-colors hover:!text-zinc-300"
            >
              {children}
            </a>
          );
        },
        code: ({
          inline,
          className,
          children,
          ...props
        }: {
          inline?: boolean;
          className?: string;
          children?: React.ReactNode;
        }) => {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");
          return !inline && match ? (
            <Code code={`\`\`\`${match[1]}\n${codeString}\n\`\`\``} />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
