import { notFound } from "next/navigation";
import { ReactElement } from "react";

import { PostLayout } from "@/components/posts";
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
    <PostLayout
      title={post.title}
      date={post.date}
      readingTime={post.readingTime}
    >
      <MarkdownRenderer content={post.content} meta={post.meta} />
    </PostLayout>
  );
}
