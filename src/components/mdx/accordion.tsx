"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 overflow-hidden rounded-md border">
      <button
        className="flex w-full justify-between bg-muted/50 p-4 text-left font-medium transition-colors hover:bg-muted"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown
          className={`transition-transform ${
            isOpen ? "rotate-180 transform" : ""
          }`}
          size={20}
        />
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}
