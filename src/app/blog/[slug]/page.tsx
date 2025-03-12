import { notFound } from "next/navigation";
import { ReactElement } from "react";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getPost } from "@/lib/mdx";

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}): Promise<ReactElement> {
  const params = await props.params;
  const post = getPost("blog", params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <article>
        <header className="mb-8">
          {/* <h1 className="mb-2 text-3xl font-bold">{post.title}</h1> */}
          <div className="text-sm text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2">•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>
        <MarkdownRenderer content={post.content} />
      </article>
    </div>
  );
}
