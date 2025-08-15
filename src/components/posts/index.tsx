"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";

import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import neotoc from "neotoc";
import "neotoc/base-modern.css";
import "neotoc/colors-zinc.css";

import { Button } from "@/components/ui/button";
import { didot } from "@/lib/custom-font";
import { cn } from "@/lib/utils";

import "./neotoc.css";

// Optional: add overrides if needed

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
  const [tocVisibility, setTocVisibility] = useState(false);

  const memoizedContent = useMemo(() => children, [children]);

  useEffect(() => {
    const removeToc = neotoc({
      io: "article >> :not(.admonition :is(h2,h3,h4,h5,h6)):is(h2,h3,h4,h5,h6) >> #sidebar",
      ellipsis: true,
      fillAnchor(h) {
        const a = h.firstChild as HTMLElement;
        const span = document.createElement("span");
        span.append(
          ...[...a!.childNodes].slice(1, -1).map((n) => n.cloneNode(true))
        );
        return span;
      },
      offsetTop: 80,
    });
    return () => removeToc();
  }, []);

  function handleArticleClick(e: React.MouseEvent<HTMLElement>) {
    const elt = e.target as HTMLElement;
    let parent = elt.parentElement;
    while (parent) {
      if (parent.tagName === "ARTICLE") break;
      if (parent.dataset.ntController !== undefined) return;
      parent = parent.parentElement;
    }
    if (tocVisibility) setTocVisibility(false);
  }

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-[1fr_minmax(0,800px)_280px_1fr]">
      <article
        data-pagefind-body
        onClick={handleArticleClick}
        className="mt-8 px-4 md:col-start-2 md:px-8"
      >
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{title}</h1>
          <div className={`text-sm text-muted-foreground ${didot.className}`}>
            <time dateTime={date}>{date}</time>
            <span className="mx-2">•</span>
            <span>{readingTime}</span>
          </div>
        </header>
        <div className="prose break-words prose-pre:overflow-auto prose-img:max-w-full">
          {memoizedContent}
        </div>
      </article>

      {/* TOC Sidebar */}
      <aside
        className={cn(
          "fixed w-[280px] flex-shrink-0 overflow-hidden rounded-bl-lg border-b border-l shadow-lg shadow-zinc-950/10 transition-all duration-300 dark:shadow-zinc-950 md:static md:block md:min-h-80 md:overflow-visible md:border-none md:shadow-none md:[font-size:0.92rem] [&>*:first-child]:sticky [&>*:first-child]:top-[calc(var(--site-header-height)+var(--top-breathing-space))]",
          tocVisibility ? "right-0" : "right-[-300px]"
        )}
        id="sidebar"
      ></aside>

      {/* TOC Toggle Button for mobile */}
      <Button
        className="fixed bottom-4 right-4 bg-gradient-to-r from-zinc-500 to-zinc-400 shadow-xl shadow-zinc-500/50 md:hidden [&_svg]:size-6"
        size="icon"
        onClick={() => setTocVisibility((x) => !x)}
      >
        {tocVisibility ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
        <span className="sr-only">Show or hide table of contents sidebar</span>
      </Button>
    </div>
  );
}
