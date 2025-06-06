/* eslint-disable */
import ReactMarkdown from "react-markdown";
import { Tweet } from "react-tweet";
import rehypeMathJax from "rehype-mathjax";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";

import { Code } from "./lib/syntax-highlighting/code-component";
import { MetaConfig } from "./utils/mdx";

/* eslint-disable */

interface MarkdownRendererProps {
  content: string;
  meta?: MetaConfig;
}

export function MarkdownRenderer({ content, meta }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className={cn("markdown prose-zinc max-w-none dark:prose-invert", {
        "markdown-no-list-margin": meta?.styling?.listExtraPadding === false,
      })}
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
              className="!text-blue-500 no-underline transition-colors hover:!text-blue-600 dark:!text-blue-400 dark:hover:!text-blue-300"
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
