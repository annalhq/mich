"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Search } from "./search";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainLinks = [
    { href: "/space", label: "space" },
    { href: "/blog", label: "blog" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
          {/* Desktop Menu */}
          <div className="hidden items-center space-x-5 sm:flex">
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
            <ThemeToggle />
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="ml-4 rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="mt-2 rounded-2xl border bg-card px-4 py-4 shadow-md sm:hidden">
            <div className="flex flex-col space-y-4">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base transition-colors hover:bg-accent hover:text-primary",
                    pathname === link.href
                      ? "bg-accent font-medium text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 border-t pt-4">
                <Search />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
