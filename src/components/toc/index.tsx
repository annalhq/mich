// old broken :/ toc v3
"use client";

import React, { useEffect, useState } from "react";

import { AlignCenter } from "lucide-react";

import { instrument } from "@/lib/custom-font";
import { cn } from "@/lib/utils";

// old broken :/ toc v3

// old broken :/ toc v3

// old broken :/ toc v3

// old broken :/ toc v3

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: string }[]
  >([]);
  const [isHovered, setIsHovered] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"))
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName.toLowerCase(),
      }));

    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0px -85% 0px" }
    );

    document.querySelectorAll("h2, h3").forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside
      className="fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 xl:flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "28px",
        transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="toc-indicator">
        <AlignCenter size={14} className="text-slate-4" />
      </div>

      <div className={cn("toc-sidebar", isHovered && "toc-sidebar-visible")}>
        <div className="toc-glass-bg">
          <h4 className={`toc-heading ${instrument.className}`}>
            Table of Contents
          </h4>
          <ul className="toc-item">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={cn(
                  "toc-list-item",
                  heading.level === "h3" && "ml-3 text-sm",
                  activeId === heading.id && "toc-list-item-active"
                )}
              >
                <a href={`#${heading.id}`}>
                  <span className="title">{heading.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
