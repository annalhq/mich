import { ContentCard } from "@/components/content-card";
import { baskeritalic } from "@/lib/custom-font";
import { getOgImage } from "@/lib/og";
import { getSpaceEntries } from "@/mdx/utils/mdx";

export const metadata = {
  title: "Space",
  description: "A collection of my projects, ideas, and explorations.",
  openGraph: {
    title: "Space",
    description: "A collection of my projects, ideas, and explorations.",
    type: "website",
    url: "/space",
    images: [
      {
        url: getOgImage({
          title: "Space",
          description: "A collection of my projects, ideas, and explorations.",
          type: "Space",
        }),
        width: 1200,
        height: 630,
        alt: "Space",
      },
    ],
  },
};

export default function SpacePage() {
  const entries = getSpaceEntries();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className={`text-3xl font-medium ${baskeritalic.className}`}>
        space
      </h1>
      <div className="space-y-4 pt-1">
        {entries.map((entry) => (
          <div
            className="transform py-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            key={entry.slug}
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
