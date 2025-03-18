import { notFound } from "next/navigation";
import { ReactElement } from "react";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getBlogPosts, getPost } from "@/lib/mdx";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost(props: {
  params: { slug: string };
}): Promise<ReactElement> {
  const { params } = await props;
  const { slug } = params;
  const post = await getPost("blog", slug);
  const params = await props.params;
  const post = getPost("blog", params.slug);

if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <article data-pagefind-body>
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
          <div className="text-sm text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2">•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>
        <MarkdownRenderer
          content={post.content}
          frontmatter={{
            title: post.title,
            description: post.description,
            date: post.date,
          }}
        />
      </article>
    </div>
  );
}
