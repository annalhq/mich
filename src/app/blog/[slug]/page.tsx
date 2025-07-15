import { notFound } from "next/navigation";
import { ReactElement } from "react";

import { PostLayout } from "@/components/posts";
import { getOgImage } from "@/lib/og";
import { MarkdownRenderer } from "@/mdx/markdown-renderer";
import { getBlogPosts, getPost } from "@/mdx/utils/mdx";

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${slug}`,
      images: [
        {
          url: getOgImage({ ...post, type: "Blog" }),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}): Promise<ReactElement> {
  const { slug } = await props.params;
  const post = getPost("blog", slug);

  if (!post) notFound();

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
