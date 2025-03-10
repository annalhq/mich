"use client";

import { MarkdownRenderer } from "@/components/markdown-renderer";

export default function SpaceEntry() {
  const content = `
# Space content

testing my space
`;

  return (
    <div className="mx-auto max-w-2xl">
      <MarkdownRenderer content={content} />
    </div>
  );
}