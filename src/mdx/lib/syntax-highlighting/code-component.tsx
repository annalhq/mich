import * as React from "react";

import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// hoist processor to avoid rebuilding on every render
const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypePrettyCode, {
    keepBackground: false,
    theme: {
      dark: "one-dark-pro",
      light: "github-light",
    },
    defaultLang: "plaintext",
    grid: true,
    transformers: [
      transformerNotationDiff({ matchAlgorithm: "v3" }),
      transformerNotationHighlight(),
    ],
    tokensMap: {
      fn: "entity.name.function",
      var: "variable",
      str: "string",
      kw: "keyword",
      num: "constant.numeric",
    },
    onVisitLine(element) {
      // Add custom styling to lines if needed
      if (element.children.length === 0) {
        element.children = [{ type: "text", value: " " }];
      }
    },
    onVisitHighlightedLine(element) {
      // Custom handling for highlighted lines
      element.properties.className = [
        ...(element.properties.className || []),
        "highlighted-line",
      ];
    },
    onVisitHighlightedChars(element) {
      // Custom handling for highlighted characters
      element.properties.className = [
        ...(element.properties.className || []),
        "highlighted-chars",
      ];
    },
  })
  .use(rehypeStringify);

export async function Code({ code }: { code: string }) {
  const file = await processor.process(code);
  return (
    <div
      className="not-prose my-6 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
      dangerouslySetInnerHTML={{ __html: String(file) }}
    />
  );
}
