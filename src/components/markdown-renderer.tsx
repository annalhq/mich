"use client";

import ReactMarkdown from "react-markdown";
import { Tweet } from "react-tweet";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className="markdown"
      components={{
        a: ({ href, children }) => {
          if (
            href?.startsWith("https://twitter.com") ||
            href?.startsWith("https://x.com")
          ) {
            return <Tweet id={href.split("/").pop() || ""} />;
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
