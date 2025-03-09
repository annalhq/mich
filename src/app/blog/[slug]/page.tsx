"use client";

import { MarkdownRenderer } from "@/components/markdown-renderer";

export default function BlogPost() {
  const content = `
# mdx-blog

checking markdown rendering
`;

  return (
    <div className="mx-auto max-w-2xl">
      <MarkdownRenderer content={content} />
    </div>
  );
}
