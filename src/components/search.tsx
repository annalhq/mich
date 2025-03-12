"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Search as SearchIcon, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchResult, search } from "@/lib/pagefind";

interface SearchState {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  isLoading: boolean;
}

export function Search(): JSX.Element {
  const [state, setState] = useState<SearchState>({
    isOpen: false,
    query: "",
    results: [],
    isLoading: false,
  });
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Callback
  const handleClose = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false, query: "" }));
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setState((prev) => ({ ...prev, isOpen: true }));
        inputRef.current?.focus();
      }
    },
    [handleClose]
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        handleClose();
      }
    },
    [handleClose]
  );

  // Effects
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleKeyDown, handleClickOutside]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (state.query) {
        setState((prev) => ({ ...prev, isLoading: true }));
        search(state.query)
          .then((results) =>
            setState((prev) => ({ ...prev, results, isLoading: false }))
          )
          .catch((error) => {
            console.error("Search failed:", error);
            setState((prev) => ({ ...prev, results: [], isLoading: false }));
          });
      } else {
        setState((prev) => ({ ...prev, results: [] }));
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [state.query]);

  const handleSelect = useCallback(
    (resultId: string) => {
      const selectedResult = state.results.find((r) => r.id === resultId);
      if (selectedResult) {
        handleClose();
        router.push(selectedResult.url);
      }
    },
    [state.results, router, handleClose]
  );

  const searchOverlay = useMemo(
    () =>
      state.isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-200"
            aria-hidden="true"
          />
          <div
            ref={searchRef}
            className="relative w-full max-w-2xl transform rounded-xl bg-white shadow-xl transition-all duration-200 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-2 dark:border-zinc-800">
              <SearchIcon className="h-5 w-5 text-zinc-500" />
              <input
                ref={inputRef}
                value={state.query}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, query: e.target.value }))
                }
                className="h-10 w-full border-0 bg-transparent text-zinc-900 placeholder:text-zinc-500 focus:outline-none dark:text-white sm:text-sm"
                placeholder="Search here"
                autoComplete="off"
                autoFocus
              />
              {state.query && (
                <button
                  onClick={() => setState((prev) => ({ ...prev, query: "" }))}
                  className="rounded-full p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {state.isLoading && (
                <div className="animate-pulse p-4 text-sm text-zinc-500">
                  Searching...
                </div>
              )}

              {state.results.length > 0 && (
                <Select onValueChange={handleSelect}>
                  <SelectTrigger className="border-0 focus:ring-0">
                    <SelectValue placeholder="Select a result..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[40vh]">
                    {state.results.map((result) => (
                      <SelectItem
                        key={result.id}
                        value={result.id}
                        className="cursor-pointer py-2"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{result.title}</span>
                          <span className="text-xs text-zinc-500">
                            {result.url}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {state.query &&
                !state.isLoading &&
                state.results.length === 0 && (
                  <div className="p-4 text-sm text-zinc-500">
                    No results found for &quot;{state.query}&quot;
                  </div>
                )}
            </div>
          </div>
        </div>
      ),
    [state, handleSelect]
  );

  return (
    <>
      <button
        onClick={() => {
          setState((prev) => ({ ...prev, isOpen: true }));
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="flex w-full items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:w-64"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden flex-1 text-left md:inline">
          Search content...
        </span>
        <kbd className="hidden rounded bg-muted px-2 py-0.5 text-xs font-light text-muted-foreground md:inline">
          Ctrl + K
        </kbd>
      </button>
      {searchOverlay}
    </>
  );
}
