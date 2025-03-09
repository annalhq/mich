"use client";

import { useCallback, useState } from "react";

import { Search } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    // TODO: Implement search functionality
  }, []);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="search..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-md border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
