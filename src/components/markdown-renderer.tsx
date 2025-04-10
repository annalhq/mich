/* eslint-disable */
"use client";

import { useState } from "react";

import { Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Tweet } from "react-tweet";
import rehypeMathJax from "rehype-mathjax";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

/* eslint-disable */

/* eslint-disable */

/* eslint-disable */

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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
        pre: ({ children, ...props }) => {
          const code = (children as any)[0]?.props?.children?.[0] || "";
          return (
            <div className="group relative">
              <pre {...props} className="rounded-lg !bg-zinc-950 p-4">
                {children}
              </pre>
              <button
                onClick={() => copyToClipboard(code)}
                className="absolute right-2 top-2 rounded-md bg-zinc-700/50 p-2 opacity-0 transition-opacity hover:bg-zinc-700 group-hover:opacity-100"
                aria-label="Copy code"
              >
                <Copy
                  className={`h-4 w-4 ${
                    copiedCode === code ? "text-zinc-300" : "text-zinc-400"
                  }`}
                />
              </button>
            </div>
          );
        },
        code: ({ children, className, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <code className={className} {...props}>
              {children}
            </code>
          ) : (
            <code className="rounded-md bg-zinc-800 px-1.5 py-0.5 text-sm">
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
