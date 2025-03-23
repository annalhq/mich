"use client";

import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { useSearch } from "@/lib/search";
import type { SearchResult } from "@/lib/search";
import { groupResults } from "@/lib/search";
import { cn } from "@/lib/utils";

export function Search(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { state, inputRef, handleSelect, handleFocus, handleChange } =
    useSearch();

  useHotkeys("escape", () => setIsModalOpen(false), { enableOnFormTags: true });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isModalOpen]);

  useHotkeys(
    typeof window !== "undefined" && navigator.userAgent.includes("Mac")
      ? "meta+k"
      : "ctrl+k",
    (e) => {
      e.preventDefault();
      setIsModalOpen(true);
    },
    { enableOnFormTags: true }
  );

  useEffect(() => {
    if (!isModalOpen && inputRef.current) {
      inputRef.current.value = "";
      handleChange({
        target: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [isModalOpen, handleChange, inputRef]);

  const SearchTrigger = () => (
    <button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-2 rounded-full bg-black/[.05] px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground dark:bg-gray-50/10"
      aria-label="Search"
    >
      <SearchIcon size={16} />
      <span className="hidden sm:inline">Search</span>
      <kbd className="ml-2 hidden h-5 items-center gap-1 rounded border border-input bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
        {typeof window !== "undefined" &&
        navigator.userAgent.includes("Mac") ? (
          <>
            <span className="text-xs">⌘</span>K
          </>
        ) : (
          "CTRL K"
        )}
      </kbd>
    </button>
  );

  return (
    <>
      <SearchTrigger />
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          >
            <div className="fixed inset-0 flex items-start justify-center p-4 sm:items-center sm:p-0">
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.95, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="w-full max-w-lg rounded-xl border border-border bg-background/95 shadow-xl"
              >
                <Combobox
                  onChange={(value: SearchResult) => {
                    handleSelect(value);
                    setIsModalOpen(false);
                  }}
                >
                  <div className="relative flex items-center border-b border-border px-3 py-2">
                    <SearchIcon
                      size={18}
                      className="mr-2 text-muted-foreground"
                    />
                    <ComboboxInput
                      ref={(node) => {
                        if (node) {
                          searchInputRef.current = node;
                        }
                      }}
                      spellCheck={false}
                      className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                      autoComplete="off"
                      type=""
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleFocus}
                      value={state.query}
                      placeholder="Search everything..."
                    />
                    {state.query && (
                      <button
                        onClick={() => {
                          if (inputRef?.current) {
                            inputRef.current.value = "";
                            handleChange({
                              target: inputRef.current,
                            } as React.ChangeEvent<HTMLInputElement>);
                          }
                        }}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      ></button>
                    )}
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="ml-2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <kbd className="flex h-5 items-center justify-center rounded border border-input px-1.5 font-mono text-[10px] font-medium">
                        ESC
                      </kbd>
                    </button>
                  </div>
                  <ComboboxOptions
                    static
                    className={cn(
                      "nextra-scrollbar max-h-[60vh] overflow-y-auto py-2",
                      state.error ||
                        state.isLoading ||
                        (!state.results.length && state.query)
                        ? "flex h-24 items-center justify-center text-sm"
                        : ""
                    )}
                  >
                    {state.error ? (
                      <div className="flex items-center gap-2 px-4 text-destructive">
                        <span>⚠️</span>
                        <div>
                          <p className="font-semibold">
                            Failed to load search index
                          </p>
                          <p className="text-xs">{state.error}</p>
                        </div>
                      </div>
                    ) : state.isLoading ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 size={16} className="animate-spin" />
                        <span>Searching...</span>
                      </div>
                    ) : state.results.length ? (
                      <SearchResults results={state.results} />
                    ) : (
                      state.query && (
                        <div className="px-4 text-muted-foreground">
                          No results found for &quot;{state.query}&quot;
                        </div>
                      )
                    )}
                  </ComboboxOptions>
                </Combobox>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface SearchResultsProps {
  results: SearchResult[];
}

function SearchResults({ results }: SearchResultsProps) {
  const groupedResults = groupResults(results);
  return (
    <>
      {Object.entries(groupedResults).map(([section, sectionResults]) => (
        <div key={section} className="mb-4 last:mb-0">
          <div className="mx-3 mb-2 border-b border-border pb-1 text-xs font-semibold uppercase text-muted-foreground">
            {section}
          </div>
          <div>
            {sectionResults.map((result) => (
              <ComboboxOption
                key={result.id}
                as={NextLink}
                value={result}
                href={result.url}
                className={({ active }) =>
                  cn(
                    "mx-2 block rounded-md px-3 py-2 transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-foreground"
                  )
                }
              >
                <div className="text-sm font-medium leading-tight">
                  {result.title}
                </div>
                {result.excerpt && (
                  <div
                    className="mt-1 line-clamp-2 text-xs leading-tight text-muted-foreground [&_mark]:bg-primary/80 [&_mark]:text-primary-foreground"
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  />
                )}
              </ComboboxOption>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
