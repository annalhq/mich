"use client";

import Link from "next/link";

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  date?: string;
}

export function ContentCard({
  title,
  description,
  href,
  date,
}: ContentCardProps) {
  return (
    <Link href={href}>
      <article className="group rounded-lg border p-4 transition-colors hover:bg-muted/50">
        <h2 className="text-lg font-medium">{title}</h2>
        {date && <time className="text-sm text-muted-foreground">{date}</time>}
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </article>
    </Link>
  );
}
