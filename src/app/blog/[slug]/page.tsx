import { notFound } from "next/navigation";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getPost } from "@/lib/mdx";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  const post = getPost("blog", params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
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
