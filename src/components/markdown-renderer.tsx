/* eslint-disable */
"use client";

import { MDXRemote } from "next-mdx-remote";

import mdxComponents from "./mdx/components";

/* eslint-disable */

interface MarkdownRendererProps {
  content: any;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return <MDXRemote {...content} components={mdxComponents} />;
}
