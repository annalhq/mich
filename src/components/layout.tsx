"use client";

import { ReactNode } from "react";

import { Navigation } from "./navigation";
import { SearchBar } from "./search-bar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        <main className="mt-8">{children}</main>
      </div>
    </div>
  );
}
