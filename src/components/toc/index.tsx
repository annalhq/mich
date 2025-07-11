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
    <aside className="fixed left-0 top-1/2 hidden -translate-y-1/2 xl:block">
      <ul className="toc-item">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn("toc-list-item", heading.level === "h3" && "pl-4")}
          >
            <a href={`#${heading.id}`} className="flex items-center">
              <div className="line-container">
                <div className="line" />
              </div>
              <span className="title">{heading.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};
