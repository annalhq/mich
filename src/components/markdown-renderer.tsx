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

          if (href?.startsWith("#")) {
            return (
              <a href={href} className="anchor">
                {children}
              </a>
            );
          }

          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
        h1: ({ children, ...props }) => (
          <h1 {...props} id={props.id}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 {...props} id={props.id}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 {...props} id={props.id}>
            {children}
          </h3>
        ),
        h4: ({ children, ...props }) => (
          <h4 {...props} id={props.id}>
            {children}
          </h4>
        ),
        h5: ({ children, ...props }) => (
          <h5 {...props} id={props.id}>
            {children}
          </h5>
        ),
        h6: ({ children, ...props }) => (
          <h6 {...props} id={props.id}>
            {children}
          </h6>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
