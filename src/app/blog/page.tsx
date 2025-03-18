import { ContentCard } from "@/components/content-card";
import { getBlogPosts } from "@/lib/mdx";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Group posts by year
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof posts>
  );

  // Get years in descending order (newest first)
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);
export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-3xl font-medium">blog</h1>
      {years.map((year) => (
        <div key={year} className="space-y-4">
          <h2 className="text-2xl font-medium text-gray-200">{year}</h2>
          <div className="space-y-4 pt-1">
            {postsByYear[year].map((post) => (
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
      ))}
    </div>
  );
}
