/* eslint-disable */
import { addBasePath } from "next/dist/client/add-base-path";

interface Pagefind {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
  options: (config: {
    baseUrl: string;
    excerptLength: number;
  }) => Promise<void>;
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindData>;
}

interface PagefindData {
  url: string;
  meta: {
    title?: string;
  };
  excerpt: string;
}

declare global {
  interface Window {
    pagefind: Pagefind;
  }
}

export async function importPagefind() {
  const pagefindModule = await import(
    /* webpackIgnore: true */ addBasePath("/_pagefind/pagefind.js")
  );
  window.pagefind = pagefindModule as Pagefind;
  await window.pagefind.options({
    baseUrl: "/",
    excerptLength: 100,
  });
}

export interface SearchResult {
  id: string;
  url: string;
  title: string;
  excerpt: string;
  type: "blog" | "space";
}

export async function search(query: string): Promise<SearchResult[]> {
  if (!window.pagefind) {
    await importPagefind();
  }

  const response = await window.pagefind.search(query);

  if (!response || !response.results) {
    console.warn("Unexpected response format from pagefind:", response);
    return [];
  }

  const searchResults = await Promise.all(
    response.results.map(async (result: PagefindResult) => {
      const data = await result.data();
      const url = data.url.replace(/\.html$/, "");
      const type: "blog" | "space" = url.startsWith("/blog/")
        ? "blog"
        : "space";
      return {
        id: result.id,
        url,
        title: data.meta.title || "Untitled",
        excerpt: data.excerpt,
        type,
      };
    })
  );

  return searchResults;
}
