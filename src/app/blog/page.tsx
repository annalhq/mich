"use client";

import { ContentCard } from "@/components/content-card";

export default function BlogPage() {
  const posts = [
    {
      title: "mdx-blog",
      description: "testing",
      href: "/blog/mdx-blog",
      date: "2024-03-20",
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-3xl font-medium">blog</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <ContentCard key={post.href} {...post} />
        ))}
      </div>
    </div>
  );
}