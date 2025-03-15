/* eslint-disable */
"use client";

import { MDXProvider } from "./mdx/mdx-provider";

/* eslint-disable */

interface MarkdownRendererProps {
  content: any;
}

// This is a server component that passes the serialized MDX to a client component
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return <MDXProvider source={content} />;
}
