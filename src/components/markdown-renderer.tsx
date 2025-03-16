/* eslint-disable */
"use client";

import { MDXRemote } from "next-mdx-remote";
import { Tweet } from "react-tweet";

/* eslint-disable */

interface MarkdownRendererProps {
  content: string;
  frontmatter?: Record<string, any>;
}

const components = {
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
    if (
      href?.startsWith("https://twitter.com") ||
      href?.startsWith("https://x.com")
    ) {
      const tweetId = href.split("/").pop() || "";
      return tweetId ? <Tweet id={tweetId} /> : <span>Invalid Tweet URL</span>;
    }
    return (
      <a href={href} target="" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export function MarkdownRenderer({
  content,
  frontmatter,
}: MarkdownRendererProps) {
  if (!content) {
    return <div>No content provided</div>;
  }

  const mdxSource = JSON.parse(content);

  return (
    <div className="markdown">
      <MDXRemote
        {...mdxSource}
        components={components}
        frontmatter={frontmatter}
      />
    </div>
  );
}
