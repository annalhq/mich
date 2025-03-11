import { ContentCard } from "@/components/content-card";
import { getBlogPosts } from "@/lib/mdx";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-3xl font-medium">blog</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <ContentCard
            key={post.slug}
            title={post.title}
            description={post.description}
            href={`/blog/${post.slug}`}
            date={post.date}
          />
        ))}
      </div>
    </div>
  );
}
