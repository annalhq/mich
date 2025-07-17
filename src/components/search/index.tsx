"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type {
  FC,
  FocusEventHandler,
  ReactElement,
  ReactNode,
  SyntheticEvent,
} from "react";
import { useDeferredValue, useEffect, useRef, useState } from "react";

import {
  Combobox,
  ComboboxInput,
  type ComboboxInputProps,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import cn from "clsx";

interface ApiSearchResult {
  title: string;
  items: {
    title: string;
    url: string;
    excerpt: string;
  }[];
}

interface SubResult {
  title: string;
  url: string;
  excerpt: string;
}

type InputProps = Omit<
  ComboboxInputProps,
  "className" | "onChange" | "onFocus" | "onBlur" | "value" | "placeholder"
>;

interface SearchProps extends InputProps {
  emptyResult?: ReactNode;
  errorText?: ReactNode;
  loading?: ReactNode;
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const SpinnerIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const InformationCircleIcon: FC<{ height?: string; className?: string }> = ({
  height,
  className,
}) => (
  <svg
    height={height}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

const INPUTS = new Set(["INPUT", "SELECT", "BUTTON", "TEXTAREA"]);

const Search: FC<SearchProps> = ({
  className,
  emptyResult = "No results found.",
  errorText = "Search failed.",
  loading = "Loading…",
  placeholder = "Search here...",
  onSearch,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<ApiSearchResult[]>([]);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const router = useRouter();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    const performSearch = async () => {
      if (!deferredSearch) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(deferredSearch)}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch search results.");
        }

        const json = await res.json();

        if (json.error) {
          throw new Error(json.error);
        }

        setResults(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred.");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [deferredSearch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const el = document.activeElement;
      if (
        !el ||
        INPUTS.has(el.tagName) ||
        (el as HTMLElement).isContentEditable
      ) {
        return;
      }
      if (
        event.key === "/" ||
        (event.key === "k" && (event.metaKey || event.ctrlKey))
      ) {
        event.preventDefault();
        inputRef.current.focus({ preventScroll: true });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleFocus: FocusEventHandler = (event) => {
    setFocused(event.type === "focus");
  };

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    onSearch?.(value);
  };

  const handleSelect = (item: SubResult | null) => {
    if (!item) return;
    router.push(item.url);
    inputRef.current.blur();
    setSearch("");
  };

  const isMac =
    typeof navigator !== "undefined"
      ? navigator.userAgent.includes("Mac")
      : false;

  const shortcut = (
    <kbd
      className={cn(
        "pointer-events-none absolute end-1.5 my-1.5 select-none transition-all",
        "bg-nextra-bg h-5 rounded px-1.5 font-mono text-[11px] font-medium text-gray-600 dark:text-gray-400",
        "nextra-border border",
        "flex items-center gap-1 contrast-more:text-current",
        "not-prose max-sm:hidden",
        focused && "invisible opacity-0"
      )}
    >
      {isMac ? (
        <>
          <span className="text-xs">⌘</span>K
        </>
      ) : (
        "CTRL K"
      )}
    </kbd>
  );

  return (
    <Combobox onChange={handleSelect}>
      <div
        className={cn(
          "nextra-search",
          "relative flex items-center",
          "text-gray-900 dark:text-gray-300",
          "contrast-more:text-gray-800 contrast-more:dark:text-gray-300",
          className
        )}
      >
        <ComboboxInput
          spellCheck={false}
          autoComplete="off"
          type="search"
          {...props}
          ref={inputRef}
          className={({ focus }) =>
            cn(
              "w-full rounded-lg px-3 py-2 md:w-64",
              "text-base leading-tight md:text-sm",
              "transition-all",
              focus
                ? "ring-primary-500/50 bg-transparent outline-none ring-2"
                : "bg-black/[.05] dark:bg-gray-50/10",
              "placeholder:text-gray-600 dark:placeholder:text-gray-400",
              "contrast-more:border contrast-more:border-current",
              "[&::-webkit-search-cancel-button]:appearance-none"
            )
          }
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleFocus}
          value={search}
          placeholder={placeholder}
        />
        {shortcut}
      </div>
      <ComboboxOptions
        transition
        anchor={{ to: "top end", gap: 10, padding: 16 }}
        className={cn(
          "nextra-search-results",
          "nextra-scrollbar max-md:h-full",
          "border border-gray-200 text-gray-100 dark:border-neutral-800",
          "z-30 rounded-xl py-2.5 shadow-xl",
          "contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50",
          "backdrop-blur-md",
          "motion-reduce:transition-none",
          "data-closed:scale-95 data-closed:opacity-0 origin-top transition duration-200 ease-out empty:invisible",
          error || isLoading || !results.length
            ? [
                "flex grow justify-center gap-2 px-8 text-sm md:min-h-28",
                error
                  ? "items-start text-red-500"
                  : "items-center text-gray-400",
              ]
            : "md:max-h-[min(calc(100vh-5rem),400px)]!",
          "w-full md:w-[576px]"
        )}
      >
        {error ? (
          <>
            <InformationCircleIcon height="1.25em" className="shrink-0" />
            <div className="grid">
              <b className="mb-2">{errorText}</b>
              {error as ReactElement | string}
            </div>
          </>
        ) : isLoading ? (
          <>
            <SpinnerIcon className="h-5 w-5 shrink-0 animate-spin" />
            {loading}
          </>
        ) : results.length > 0 ? (
          results.map((result) => <Result key={result.title} data={result} />)
        ) : (
          deferredSearch && emptyResult
        )}
      </ComboboxOptions>
    </Combobox>
  );
};

const Result: FC<{ data: ApiSearchResult }> = ({ data }) => {
  return (
    <>
      <div
        className={cn(
          "not-first:mt-6 mx-2.5 mb-2 select-none border-b border-black/10 px-2.5 pb-1.5 text-xs font-semibold uppercase text-gray-600 dark:border-white/20 dark:text-gray-300",
          "contrast-more:border-gray-600 contrast-more:text-gray-900 contrast-more:dark:border-gray-50 contrast-more:dark:text-gray-50"
        )}
      >
        {data.title}
      </div>
      {data.items.map((item) => (
        <ComboboxOption
          key={item.url}
          as={NextLink}
          value={item}
          href={item.url}
          className={({ focus }) =>
            cn(
              "mx-2.5 break-words rounded-md",
              "contrast-more:border",
              focus
                ? "text-primary-600 bg-primary-500/10 contrast-more:border-current"
                : "text-gray-800 contrast-more:border-transparent dark:text-gray-300",
              "block scroll-m-12 px-2.5 py-2"
            )
          }
        >
          <div className="text-base font-semibold leading-5">{item.title}</div>
          <div
            className={cn(
              "mt-1 text-sm leading-[1.35rem] text-gray-600 dark:text-gray-400 contrast-more:dark:text-gray-50",
              "[&_mark]:bg-[--selection-background] [&_mark]:text-[--selection-foreground]"
            )}
            dangerouslySetInnerHTML={{ __html: item.excerpt }}
          />
        </ComboboxOption>
      ))}
    </>
  );
};

export default Search;
