import { notFound } from "next/navigation";
import { ReactElement } from "react";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getPost, getSpaceEntries } from "@/lib/mdx";

export async function generateStaticParams() {
  const entries = getSpaceEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function SpaceEntry(props: {
  params: Promise<{ slug: string }>;
}): Promise<ReactElement> {
  const params = await props.params;
  const entry = getPost("space", params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <article data-pagefind-body className="overflow-hidden">
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{entry.title}</h1>
          <div className="text-sm text-muted-foreground">
            <time dateTime={entry.date}>{entry.date}</time>
            <span className="mx-2">•</span>
            <span>{entry.readingTime}</span>
          </div>
        </header>
        <div className="prose break-words prose-pre:overflow-auto prose-img:max-w-full">
          <MarkdownRenderer content={entry.content} />
        </div>
      </article>
    </div>
  );
}
