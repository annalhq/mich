"use client";

import Link from "next/link";

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
  category?: string;
  image?: string;
}

export function ContentCard({
  title,
  description,
  href,
  date,
  readingTime,
  tags = [],
  category,
  // image // image prop disable for now
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[250px] rounded-xl border bg-card p-4 transition-all hover:bg-accent/50"
    >
      <article className="flex h-full flex-col">
        {category && (
          <span className="mb-2 inline-flex w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {category}
          </span>
        )}

        <h2 className="mb-2 text-lg font-bold leading-tight">{title}</h2>

        <p className="line-clamp-2 flex-grow text-sm text-muted-foreground">
          {description}
        </p>

        <div className="mt-4">
          {tags && tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {date && <time dateTime={date}>{date}</time>}
            {readingTime && <span>{readingTime}</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}
