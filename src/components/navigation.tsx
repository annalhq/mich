"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Search } from "./search";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "home" },
    { href: "/space", label: "space" },
    { href: "/blog", label: "blog" },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-8">
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
  );
}
