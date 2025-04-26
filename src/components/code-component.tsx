import * as React from "react";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function Code({ code }: { code: string }) {
  const highlightedCode = await highlightCode(code);
  return (
    <div
      className="[&>pre]:!m-0 [&>pre]:!overflow-visible [&>pre]:!bg-transparent [&>pre]:!p-0"
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
    })
    .use(rehypeStringify)
    .process(code);

  return String(file);
}
