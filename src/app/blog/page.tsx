import { ContentCard } from "@/components/content-card";
import { baskeritalic } from "@/lib/custom-font";
import { getOgImage } from "@/lib/og";
import { getBlogPosts } from "@/mdx/utils/mdx";

export const metadata = {
  title: "Blog",
  description: "Thoughts on technology, life, and everything in between.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on technology, life, and everything in between.",
    type: "website",
    url: "/blog",
    images: [
      {
        url: getOgImage({
          title: "Blog",
          description:
            "Thoughts on technology, life, and everything in between.",
          type: "Blog",
        }),
        width: 1200,
        height: 630,
        alt: "Blog",
      },
    ],
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className={`text-3xl font-medium ${baskeritalic.className}`}>blog</h1>
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
              readingTime={post.readingTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
