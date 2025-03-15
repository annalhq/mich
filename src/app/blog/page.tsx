import { ContentCard } from "@/components/content-card";
import { getBlogPosts } from "@/lib/mdx";

export default async function BlogPage() {
  const posts = await getBlogPosts(); // Make sure we await the async function

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-3xl font-medium">blog</h1>
      <div className="space-y-4 pt-1">
        {posts.map((post) => (
          <div
            className="transform py-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            key={post.slug}
          >
            <ContentCard
              title={post.title}
              description={post.description}
              href={`/blog/${post.slug}`}
              date={post.date}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
