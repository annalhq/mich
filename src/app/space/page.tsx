import { ContentCard } from "@/components/content-card";
import { getSpaceEntries } from "@/lib/mdx";

export default function SpacePage() {
  const entries = getSpaceEntries();

  return (
    <div className="mx-auto max-w-7xl space-y-8" data-pagefind-body>
      <h1 className="text-3xl font-medium">space</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <div
            key={entry.slug}
            className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <ContentCard
              title={entry.title}
              description={entry.description}
              href={`/space/${entry.slug}`}
              date={entry.date}
              readingTime={entry.readingTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
