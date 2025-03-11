import { ContentCard } from "@/components/content-card";
import { getSpaceEntries } from "@/lib/mdx";

export default function SpacePage() {
  const entries = getSpaceEntries();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-3xl font-medium">space</h1>
      <div className="space-y-4">
        {entries.map((entry) => (
          <ContentCard
            key={entry.slug}
            title={entry.title}
            description={entry.description}
            href={`/space/${entry.slug}`}
            date={entry.date}
          />
        ))}
      </div>
    </div>
  );
}
