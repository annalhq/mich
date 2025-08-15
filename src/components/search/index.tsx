"use client";

import NextLink from "next/link";
import {
  FocusEventHandler,
  Fragment,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  Transition,
} from "@headlessui/react";
import cn from "clsx";
import { useHotkeys } from "react-hotkeys-hook";

import { useSearch } from "@/lib/search";
import type { SearchResult } from "@/lib/search";
import { groupResults } from "@/lib/search";

const INPUTS = new Set(["INPUT", "SELECT", "BUTTON", "TEXTAREA"]);

function SearchIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}

function CloseIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 6l8 8M6 14 14 6"
      />
    </svg>
  );
}

export default function SearchBar() {
  const { state, inputRef, handleSelect, handleFocus, handleChange } =
    useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null!);

  const isMac =
    typeof navigator !== "undefined"
      ? navigator.userAgent.includes("Mac")
      : false;

  // ah! looks atrocious in the input text bar
  // const HOTKEY = isMac ? "⌘K" : "Ctrl K";

  useHotkeys(
    isMac ? "meta+k" : "ctrl+k",
    (e) => {
      e.preventDefault();
      setIsOpen(true);
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "/",
    (e) => {
      const el = document.activeElement;
      if (
        !el ||
        INPUTS.has(el.tagName) ||
        (el as HTMLElement).isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      setIsOpen(true);
    },
    { enableOnFormTags: true }
  );

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => searchInputRef.current?.select());
    }
  }, [isOpen]);

  const handleFocusInput: FocusEventHandler = (event) => {
    handleFocus(event);
  };

  const handleQueryChange = (event: SyntheticEvent<HTMLInputElement>) =>
    handleChange(event);

  return (
    <>
      <button
        type="button"
        aria-label="Open search"
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          initialFocus={searchInputRef}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto p-4 md:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-[0.97] translate-y-2"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-[0.97] translate-y-2"
            >
              <Dialog.Panel
                className={cn(
                  "mx-auto w-full max-w-xl",
                  "rounded-xl border border-gray-200/70 dark:border-neutral-700/70",
                  "bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-900/90 supports-[backdrop-filter]:dark:bg-neutral-900/60",
                  "shadow-lg ring-1 ring-black/5 dark:ring-white/5"
                )}
              >
                <Dialog.Title className="sr-only">Search</Dialog.Title>
                <Combobox
                  onChange={(value: SearchResult) => {
                    handleSelect(value);
                    setIsOpen(false);
                  }}
                >
                  <div className="relative flex items-center px-3 pt-3">
                    <SearchIcon className="pointer-events-none absolute left-5 h-5 w-5 text-gray-400" />
                    <ComboboxInput
                      spellCheck={false}
                      autoComplete="off"
                      type="search"
                      ref={(node) => {
                        if (node) {
                          searchInputRef.current = node;
                          if (typeof inputRef === "object" && inputRef) {
                            (
                              inputRef as React.MutableRefObject<HTMLInputElement | null>
                            ).current = node;
                          }
                        }
                      }}
                      className={cn(
                        "w-full rounded-md bg-white/70 dark:bg-neutral-800/70",
                        "py-2 pl-10 pr-24 text-base md:text-sm",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-500",
                        "border border-gray-200 dark:border-neutral-700",
                        "focus:border-[--selection-background] focus:outline-none focus:ring-2 focus:ring-[--selection-background]",
                        "transition-shadow",
                        "[&::-webkit-search-cancel-button]:appearance-none"
                      )}
                      onChange={handleQueryChange}
                      onFocus={handleFocusInput}
                      onBlur={handleFocusInput}
                      value={state.query}
                      placeholder="Type to search..."
                    />
                    <div className="absolute right-4 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Close search"
                        onClick={() => setIsOpen(false)}
                        className="focus-visible:ring-primary-500/50 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 dark:hover:bg-neutral-800 dark:hover:text-gray-200"
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <ComboboxOptions
                    static
                    className={cn(
                      "mt-3 max-h-[min(60vh,420px)] scroll-py-2 overflow-y-auto",
                      "border-t border-gray-200/70 dark:border-neutral-700/70",
                      "px-1.5 py-2",
                      "text-gray-900 dark:text-gray-200",
                      "empty:py-8 empty:text-center empty:text-sm empty:text-gray-500 dark:empty:text-gray-500"
                    )}
                  >
                    {state.error ? (
                      <div className="px-4 py-2 text-sm text-red-600 dark:text-red-400">
                        <b className="font-medium">Search failed:</b>{" "}
                        {String(state.error)}
                      </div>
                    ) : state.isLoading ? (
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        Loading…
                      </div>
                    ) : state.results.length > 0 ? (
                      <SearchResults results={state.results} />
                    ) : (
                      state.query && "No results found."
                    )}
                  </ComboboxOptions>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function SearchResults({ results }: { results: SearchResult[] }) {
  const groupedResults = groupResults(results);
  return (
    <>
      {Object.entries(groupedResults).map(([section, sectionResults]) => (
        <div key={section}>
          <div
            className={cn(
              "not-first:mt-6 mx-2.5 mb-2 select-none border-b border-black/10 px-2.5 pb-1.5 text-xs font-semibold uppercase text-gray-600 dark:border-white/20 dark:text-gray-300",
              "contrast-more:border-gray-600 contrast-more:text-gray-900 contrast-more:dark:border-gray-50 contrast-more:dark:text-gray-50"
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
                  "contrast-more:border",
                  focus
                    ? "text-primary-600 bg-primary-500/10 contrast-more:border-current"
                    : "text-gray-800 contrast-more:border-transparent dark:text-gray-300",
                  "block scroll-m-12 px-2.5 py-2"
                )
              }
            >
              <div className="text-base font-semibold leading-5">
                {result.title}
              </div>
              {result.excerpt && (
                <div
                  className={cn(
                    "mt-1 text-sm leading-[1.35rem] text-gray-600 dark:text-gray-400 contrast-more:dark:text-gray-50",
                    "[&_mark]:bg-[--selection-background] [&_mark]:text-[--selection-foreground]"
                  )}
                  dangerouslySetInnerHTML={{ __html: result.excerpt }}
                />
              )}
            </ComboboxOption>
          ))}
        </div>
      ))}
    </>
  );
}
