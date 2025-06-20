"use client";

import React, { useCallback, useEffect, useState } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: string }[]
  >([]);
  const [visibleHeadings, setVisibleHeadings] = useState<Set<string>>(
    new Set()
  );

  const getHeadings = useCallback(() => {
    return Array.from(document.querySelectorAll("h1, h2, h3"))
      .filter((heading) => heading.id)
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName.toLowerCase(),
      }));
  }, []);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      setVisibleHeadings((prevVisibleHeadings) => {
        const newVisibleHeadings = new Set(prevVisibleHeadings);
        for (const entry of entries) {
          if (entry.isIntersecting) {
            newVisibleHeadings.add(entry.target.id);
          } else {
            newVisibleHeadings.delete(entry.target.id);
          }
        }
        return newVisibleHeadings;
      });
    },
    []
  );

  useEffect(() => {
    const collectedHeadings = getHeadings();
    setHeadings(collectedHeadings);

    if (collectedHeadings.length === 0) {
      return;
    }

    const observerOptions = {
      root: null,
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    collectedHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [getHeadings, handleIntersection]);

  const scroll = (id: string) => {
    document
      .querySelectorAll(
        "h1[data-highlight='true'], h2[data-highlight='true'], h3[data-highlight='true']"
      )
      .forEach((el) => el.setAttribute("data-highlight", "false"));

    const element = document.getElementById(id);

    if (element) {
      const topOffset = element.offsetTop - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });

      element.setAttribute("data-highlight", "true");
      setTimeout(() => {
        element.setAttribute("data-highlight", "false");
      }, 2000);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <motion.nav
        initial={{ opacity: 0, x: "1rem" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "1rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "text-[0.6875rem]",
          "fixed mt-0 h-full justify-start space-y-4 transition",
          "p-4",
          "w-56",
          "hidden xl:block",
          "right-4 top-[10rem]",
          "xl:right-0 xl:top-[6rem]"
        )}
      >
        <div className="mt-0 flex flex-col gap-0">
          {" "}
          {/* Container for heading links */}
          {headings.map((heading) => (
            <div key={heading.id} className="mt-0">
              {" "}
              <button
                type="button"
                onClick={() => scroll(heading.id)}
                className={cn(
                  "w-full text-left text-muted opacity-100 transition-all duration-150 ease-in-out hover:opacity-75", // Ensure w-full for full clickable area, added transition-all for smoother visual changes
                  "border-l py-1",
                  {
                    "border-l-gray-400 dark:border-l-gray-600":
                      !visibleHeadings.has(heading.id),
                    "font-semibold text-gray-900 dark:text-gray-100":
                      visibleHeadings.has(heading.id),
                    "border-primary": visibleHeadings.has(heading.id),
                    "pl-2": heading.level === "h1",
                    "pl-4": heading.level === "h2",
                    "pl-6": heading.level === "h3",
                  }
                )}
                data-active={visibleHeadings.has(heading.id) ? "true" : "false"}
              >
                {heading.text}
              </button>
            </div>
          ))}
        </div>
      </motion.nav>
    </React.Fragment>
  );
};
