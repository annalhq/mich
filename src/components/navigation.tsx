"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Search } from "./search";

export function Navigation() {
  const pathname = usePathname();

  const mainLinks = [
    { href: "/space", label: "space" },
    { href: "/blog", label: "blog" },
  ];

  return (
    <div className="py-6">
      <nav className="mx-auto max-w-2xl px-4 sm:px-0">
        <div className="flex items-center justify-between rounded-2xl border bg-card px-4 py-2 shadow-md">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-foreground"
            )}
          >
            ann
          </Link>
          <div className="flex items-center space-x-8">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  pathname === link.href
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Search />
          </div>
        </div>
      </nav>
    </div>
  );
}
