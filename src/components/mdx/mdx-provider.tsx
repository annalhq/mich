/* eslint-disable */
"use client";

import { MDXRemote } from "next-mdx-remote";

import mdxComponents from "./components";

/* eslint-disable */

/* eslint-disable */

export function MDXProvider({ source }: { source: any }) {
  return <MDXRemote {...source} components={mdxComponents} />;
}
