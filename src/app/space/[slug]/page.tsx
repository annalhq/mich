"use client";

import { MarkdownRenderer } from "@/components/markdown-renderer";

export default function SpaceEntry({ params }: { params: { slug: string } }) {
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