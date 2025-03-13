// search-bar.tsx
"use client";

import NextLink from "next/link";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import cn from "clsx";

import { SearchResult, groupResults, useSearch } from "@/lib/search";

// search-bar.tsx

// search-bar.tsx

export function Search(): JSX.Element {
  const {
    state,
    inputRef,
    focused,
    mounted,
    handleSelect,
    handleFocus,
    handleChange,
  } = useSearch();

  const icon = mounted && !focused && (
    <kbd
      className={cn(
        "absolute end-1.5 my-1.5 select-none",
        "h-5 rounded bg-background px-1.5 font-mono text-[11px] font-medium text-muted-foreground",
        "border border-input",
        "flex items-center gap-1",
        "not-prose max-sm:hidden"
      )}
    >
      {navigator.userAgent.includes("Mac") ? (
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
      <div className={cn("relative flex items-center", "text-foreground")}>
        <ComboboxInput
          ref={inputRef}
          spellCheck={false}
          className={({ focus }) =>
            cn(
              "rounded-lg px-3 py-2 transition-colors",
              "w-full md:w-64",
              "text-base leading-tight md:text-sm",
              focus
                ? "bg-transparent ring-2 ring-ring ring-offset-2"
                : "bg-black/[.05] dark:bg-gray-50/10",
              "placeholder:text-muted-foreground",
              "[&::-webkit-search-cancel-button]:appearance-none"
            )
          }
          autoComplete="off"
          type="search"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleFocus}
          value={state.query}
          placeholder="Search here"
        />
        {icon}
      </div>
      <ComboboxOptions
        transition
        anchor={{ to: "top end", gap: 10, padding: 16 }}
        className={({ open }) =>
          cn(
            "nextra-scrollbar max-md:h-full",
            "border border-border text-foreground",
            "z-30 rounded-xl py-2.5 shadow-xl",
            "bg-background/70 backdrop-blur-md",
            "transition-opacity motion-reduce:transition-none",
            open ? "opacity-100" : "opacity-0",
            state.error || state.isLoading || !state.results.length
              ? [
                  "flex grow justify-center gap-2 px-8 text-sm md:min-h-28",
                  state.error
                    ? "items-start text-destructive"
                    : "items-center text-muted-foreground",
                ]
              : "md:max-h-[min(calc(100vh-5rem),400px)]!",
            "w-full md:w-[576px]",
            "empty:invisible"
          )
        }
      >
        {state.error ? (
          <>
            <div className="shrink-0">⚠️</div>
            <div className="grid">
              <b className="mb-2">Failed to load search index</b>
              {state.error}
            </div>
          </>
        ) : state.isLoading ? (
          <>
            <div className="shrink-0 animate-spin">⏳</div>
            <span>Searching...</span>
          </>
        ) : state.results.length ? (
          <Result results={state.results} />
        ) : (
          state.query && (
            <div className="px-8 py-4">
              No results found for &quot;{state.query}&quot;
            </div>
          )
        )}
      </ComboboxOptions>
    </Combobox>
  );
}

interface ResultProps {
  results: SearchResult[];
}

function Result({ results }: ResultProps) {
  const groupedResults = groupResults(results);

  return (
    <>
      {Object.entries(groupedResults).map(([section, sectionResults]) => (
        <div key={section}>
          <div
            className={cn(
              "not-first:mt-6 mx-2.5 mb-2 select-none border-b border-border px-2.5 pb-1.5 text-xs font-semibold uppercase text-muted-foreground"
            )}
          >
            {section}
          </div>
          {sectionResults.map((result) => (
            <ComboboxOption
              key={result.id}
              as={NextLink}
              value={result}
              href={result.url}
              className={({ focus }) =>
                cn(
                  "mx-2.5 break-words rounded-md",
                  focus ? "bg-primary/10 text-primary" : "text-foreground",
                  "block scroll-m-12 px-2.5 py-2"
                )
              }
            >
              <div className="text-base font-semibold leading-5">
                {result.title}
              </div>
              <div
                className={cn(
                  "mt-1 text-sm leading-[1.35rem] text-muted-foreground",
                  "[&_mark]:bg-primary/80 [&_mark]:text-primary-foreground"
                )}
                dangerouslySetInnerHTML={{ __html: result.excerpt || "" }}
              />
            </ComboboxOption>
          ))}
        </div>
      ))}
    </>
  );
}
