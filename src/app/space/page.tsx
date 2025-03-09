"use client";

import { ContentCard } from "@/components/content-card";

export default function SpacePage() {
  const entries = [
    {
      title: "test-space",
      description: "idk",
      href: "/space/alpha",
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-3xl font-medium">space</h1>
      <div className="space-y-4">
        {entries.map((entry) => (
          <ContentCard key={entry.href} {...entry} />
        ))}
      </div>
    </div>
  );
}