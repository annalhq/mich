import { notFound } from "next/navigation";
import { ReactElement } from "react";

import { MarkdownRenderer } from "@/mdx/markdown-renderer";
import { getBlogPosts, getPost } from "@/mdx/utils/mdx";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}): Promise<ReactElement> {
  const params = await props.params;
  const post = getPost("blog", params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <article data-pagefind-body className="overflow-hidden">
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
          <div className="text-sm text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2">•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>
        <div className="prose break-words prose-pre:overflow-auto prose-img:max-w-full">
          <MarkdownRenderer content={post.content} meta={post.meta} />
        </div>
      </article>
    </div>
  );
}
