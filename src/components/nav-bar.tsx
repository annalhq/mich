"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { AlignJustify, Home, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Search } from "./search";

export function NavBar() {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setScrollingDown(currentScrollY > lastScrollY);
      } else {
        setScrollingDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Navigation items
  const navItems = [
    { name: "Blog", href: "/blog" },
    { name: "Space", href: "/space" },
  ];

  // Dynamic classes based on scroll position
  const navbarClasses = cn(
    "fixed left-0 right-0 z-40 transition-all duration-300 ease-in-out",
    scrollingDown ? "-top-20" : "top-0"
  );

  // Show home icon only when not on homepage
  const showHomeIcon = pathname !== "/";

  return (
    <>
      <header className={navbarClasses}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-b-xl border-b border-border bg-background/80 shadow-sm backdrop-blur-md">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-4">
                {showHomeIcon && (
                  <Link
                    href="/"
                    className="rounded-full p-2 transition-colors hover:bg-muted"
                    aria-label="Home"
                  >
                    <Home size={20} />
                  </Link>
                )}
                <nav className="hidden items-center space-x-4 md:flex">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname.startsWith(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex items-center">
                <Search />
                <button
                  className="ml-2 rounded-md p-2 transition-colors hover:bg-muted md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X size={20} />
                  ) : (
                    <AlignJustify size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-background pt-16 md:hidden"
          >
            <div className="space-y-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-4 py-3 text-base font-medium transition-colors",
                    pathname.startsWith(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
