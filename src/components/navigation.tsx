"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Search } from "./search";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "ann" },
    { href: "/space", label: "space" },
    { href: "/blog", label: "blog" },
  ];

  return (
    <div className="flex justify-center py-6">
      <nav className="rounded-2xl border bg-card shadow-md">
        <div className="flex items-center justify-between space-x-6 px-4 py-2">
          <div className="flex items-center space-x-12">
            {links.map((link) => (
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
          </div>
          <div className="flex items-center space-x-4">
            <Search />
          </div>
        </div>
      </nav>
    </div>
  );
}
