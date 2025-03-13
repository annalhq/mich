"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";

import { SearchResult as BaseSearchResult, search } from "@/lib/pagefind";

export interface SearchResult extends BaseSearchResult {
  section?: string;
}

export interface SearchState {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | React.ReactElement;
}

const INPUTS = new Set(["INPUT", "SELECT", "BUTTON", "TEXTAREA"]);

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    isOpen: false,
    query: "",
    results: [],
    isLoading: false,
    error: "",
  });
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const deferredSearch = useDeferredValue(state.query);
  const [focused, setFocused] = useState(false);
  const mounted = typeof window !== "undefined";

  // Callbacks
  const handleClose = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false, query: "" }));
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (
        !el ||
        INPUTS.has(el.tagName) ||
        (el as HTMLElement).isContentEditable
      ) {
        return;
      }

      if (
        e.key === "/" ||
        (e.key === "k" &&
          (navigator.platform.includes("Mac") ? e.metaKey : e.ctrlKey))
      ) {
        e.preventDefault();
        inputRef.current?.focus({ preventScroll: true });
      } else if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleSelect = useCallback(
    (searchResult: SearchResult | null) => {
      if (!searchResult) return;
      inputRef.current?.blur();
      router.push(searchResult.url);
      setState((prev) => ({ ...prev, query: "", isOpen: false }));
    },
    [router]
  );

  const handleFocus = useCallback((e: React.FocusEvent) => {
    const isFocus = e.type === "focus";
    setFocused(isFocus);
    if (isFocus) {
      setState((prev) => ({ ...prev, isOpen: true }));
    }
  }, []);

  const handleChange = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setState((prev) => ({ ...prev, query: value }));
    },
    []
  );

  // Effects
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!deferredSearch) {
      setState((prev) => ({ ...prev, results: [], error: "" }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));
    search(deferredSearch)
      .then((results) =>
        setState((prev) => ({ ...prev, results, isLoading: false }))
      )
      .catch((error) => {
        console.log("Search failed:", error);
        setState((prev) => ({
          ...prev,
          results: [],
          isLoading: false,
          error: `Search failed: ${error.message || "Unknown error"}`,
        }));
      });
  }, [deferredSearch]);

  return {
    state,
    inputRef,
    focused,
    mounted,
    handleSelect,
    handleFocus,
    handleChange,
  };
}

// Utility function to group search results
export function groupResults(
  results: SearchResult[]
): Record<string, SearchResult[]> {
  return results.reduce(
    (acc, result) => {
      const section = result.section || "Blog";
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(result);
      return acc;
    },
    {} as Record<string, SearchResult[]>
  );
}
