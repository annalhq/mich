import { ReactNode } from "react";

import { didot } from "@/lib/custom-font";

import { TableOfContents } from "../on-this-page";

interface PostLayoutProps {
  title: string;
  date: string;
  readingTime: string;
  children: ReactNode;
}

export function PostLayout({
  title,
  date,
  readingTime,
  children,
}: PostLayoutProps) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <article data-pagefind-body className="overflow-hidden">
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{title}</h1>
          <div className={`text-sm text-muted-foreground ${didot.className}`}>
            <time dateTime={date}>{date}</time>
            <span className="mx-2">•</span>
            <span>{readingTime}</span>
          </div>
        </header>
        <TableOfContents />
        <div className="prose break-words prose-pre:overflow-auto prose-img:max-w-full">
          {children}
        </div>
      </article>
    </div>
  );
}
