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

export async function Code({ code }: { code: string }) {
  const highlightedCode = await highlightCode(code);
  return (
    <div
      className="[&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:overflow-y-visible [&>pre]:rounded-md [&>pre]:border [&>pre]:border-zinc-700 [&>pre]:bg-transparent [&>pre]:p-1 [&_span.highlighted]:bg-yellow-200/10 [&_span.highlighted]:px-1"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}

async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      keepBackground: false,
      theme: "one-dark-pro",
      transformers: [
        transformerNotationDiff({
          matchAlgorithm: "v3",
        }),
        transformerNotationHighlight(),
      ],
    })
    .use(rehypeStringify)
    .process(code);

  return String(file);
}
