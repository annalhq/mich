import { notFound } from "next/navigation";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getPost } from "@/lib/mdx";

interface SpaceEntryProps {
  params: {
    slug: string;
  };
}

export default function SpaceEntry({ params }: SpaceEntryProps) {
  const entry = getPost("space", params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{entry.title}</h1>
          <div className="text-sm text-muted-foreground">
            <time dateTime={entry.date}>{entry.date}</time>
            <span className="mx-2">•</span>
            <span>{entry.readingTime}</span>
          </div>
        </header>
        <MarkdownRenderer content={entry.content} />
      </article>
    </div>
  );
}
