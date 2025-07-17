export default {
  /**
   * Search configuration for Pagefind
   * This is used to configure the search engine API.
   * @see /app/api/search/route.ts
   */
  search: {
    queryKeyword: "q",
    minQueryLength: 2,
    limitKeyword: "limit",
    defaultMaxResults: 10,
    excerptLengthKeyword: "excerptLength",
    defaultExcerptLength: 30,
    defaultLanguage: "en",
  },
} as const;
