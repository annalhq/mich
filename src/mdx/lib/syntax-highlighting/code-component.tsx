import * as React from "react";

import { transformerCopyButton } from "@rehype-pretty/transformers";
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
      transformerCopyButton({
        visibility: "hover",
        feedbackDuration: 3_000,
      }),
    ],
    tokensMap: {
      fn: "entity.name.function",
      var: "variable",
      str: "string",
      kw: "keyword",
      num: "constant.numeric",
    },
    onVisitLine(element) {
      if (element.children.length === 0) {
        element.children = [{ type: "text", value: " " }];
      }
    },
    onVisitHighlightedLine(element) {
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
      className="not-prose"
      dangerouslySetInnerHTML={{ __html: String(file) }}
    />
  );
}
