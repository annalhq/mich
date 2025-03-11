/* eslint-disable */
"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { Combobox, Dialog, Transition } from "@headlessui/react";
import { Search as SearchIcon } from "lucide-react";

import { SearchResult, search } from "@/lib/pagefind";

/* eslint-disable */

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const searchContent = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await search(query);
        setResults(searchResults);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchContent, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    router.push(result.url);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground md:w-64"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden rounded bg-muted px-2 py-0.5 text-xs font-light text-muted-foreground md:inline">
          Ctrl K
        </kbd>
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          onClose={setIsOpen}
          className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]"
        >
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-zinc-900/80"
              aria-hidden="true"
            />
          </Transition.Child>

          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Combobox
              onChange={handleSelect}
              as="div"
              className="relative mx-auto max-w-xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 dark:divide-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center px-4">
                <SearchIcon className="h-5 w-5 text-zinc-500" />
                <Combobox.Input
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 w-full border-0 bg-transparent pl-4 text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-0 dark:text-white sm:text-sm"
                  placeholder="Search..."
                  autoComplete="off"
                />
              </div>

              {isLoading && (
                <div className="p-4 text-sm text-zinc-500">Loading...</div>
              )}

              {results.length > 0 && (
                <Combobox.Options
                  static
                  className="max-h-96 overflow-y-auto py-4 text-sm"
                >
                  {results.map((result) => (
                    <Combobox.Option key={result.id} value={result}>
                      {({ active }) => (
                        <div
                          className={`px-4 py-2 ${
                            active
                              ? "bg-zinc-100 dark:bg-zinc-800"
                              : "bg-white dark:bg-zinc-900"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-zinc-900 dark:text-white">
                              {result.title}
                            </h3>
                            <span
                              className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                                result.type === "blog"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                              }`}
                            >
                              {result.type}
                            </span>
                          </div>
                          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                            {result.excerpt}
                          </p>
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}

              {query && !isLoading && results.length === 0 && (
                <div className="p-4 text-sm text-zinc-500">
                  No results found for &quot;{query}&quot;
                </div>
              )}
            </Combobox>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
}
