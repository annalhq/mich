"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: string }[]
  >([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"))
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName.toLowerCase(),
      }));

    setHeadings(elements);
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="text-sm">
      <h3 className="mb-3 font-medium">On this page</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block border-l border-slate-200 py-0.5 text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-200 dark:hover:text-slate-200",
                heading.level === "h3" ? "pl-6" : "pl-4"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
