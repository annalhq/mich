import { notFound } from "next/navigation";
import { ReactElement } from "react";

import { PostLayout } from "@/components/posts";
import { MarkdownRenderer } from "@/mdx/markdown-renderer";
import { getPost, getSpaceEntries } from "@/mdx/utils/mdx";

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
    <PostLayout
      title={entry.title}
      date={entry.date}
      readingTime={entry.readingTime}
    >
      <div className="prose break-words prose-pre:overflow-auto prose-img:max-w-full">
        <MarkdownRenderer content={entry.content} meta={entry.meta} />
      </div>
    </PostLayout>
  );
}
