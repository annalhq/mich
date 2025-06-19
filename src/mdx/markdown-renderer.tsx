/* eslint-disable */
import React from "react";

import "katex/dist/katex.min.css";
import { MarkdownAsync } from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypekatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import FootnoteBackReference from "@/components/footnote/back-reference";
import FootnoteForwardReference from "@/components/footnote/forward-reference";

/* my custom components */
import Link from "@/components/link";
import { cn } from "@/lib/utils";

import { MetaConfig } from "./utils/mdx";

/* eslint-disable */

interface MarkdownRendererProps {
  content: string;
  meta?: MetaConfig;
}

export function MarkdownRenderer({ content, meta }: MarkdownRendererProps) {
  return (
    <MarkdownAsync
      className={cn("markdown prose-zinc max-w-none dark:prose-invert", {
        "markdown-no-list-margin": meta?.styling?.listExtraPadding === false,
      })}
      remarkPlugins={[
        remarkGfm,
        remarkFrontmatter,
        remarkDirective,
        remarkMath,
      ]}
      rehypePlugins={[
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: "linked-heading",
            },
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: "catppuccin-macchiato",
            keepBackground: false,
          },
        ],
        rehypeRaw,
        rehypekatex,
      ]}
      components={{
        a: ({ children, href }) => {
          if (href?.startsWith("#user-content-fn-")) {
            const id = href.substring(1).replace("fn-", "fnref-");
            return (
              <FootnoteForwardReference href={href} id={id}>
                {children}
              </FootnoteForwardReference>
            );
          }
          return <Link href={href}>{children}</Link>;
        },
        ol: ({
          className,
          ...props
        }: React.HTMLAttributes<HTMLOListElement>) => {
          if (
            React.Children.toArray(props.children).some(
              (child) =>
                React.isValidElement(child) &&
                (child as React.ReactElement).props.id?.includes(
                  "user-content-fn-"
                )
            )
          ) {
            return (
              <ol data-footnotes>
                <div className="mb-2 mt-6 text-muted text-small">Footnotes</div>
                {props.children}
              </ol>
            );
          }
          return (
            <ol
              className={cn("ml-2 mt-2 list-decimal", className)}
              {...props}
            />
          );
        },
        ul: ({
          className,
          ...props
        }: React.HTMLAttributes<HTMLUListElement>) => (
          <ul className={cn("ml-2 mt-2 list-disc", className)} {...props} />
        ),
        li: ({
          className,
          children,
          ...props
        }: React.HTMLAttributes<HTMLLIElement>) => {
          if (props.id?.includes("user-content-fn-")) {
            return (
              <li id={props.id}>
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    if (child.type === "p") {
                      const href = child.props.children.find(
                        (child: React.ReactNode) => {
                          if (React.isValidElement(child)) {
                            return (
                              React.isValidElement(child) &&
                              "props" in child &&
                              (child.props as { href?: string }).href?.includes(
                                "user-content-fnref-"
                              )
                            );
                          }
                          return false;
                        }
                      )?.props.href;

                      const filtered = child.props.children.filter(
                        (child: React.ReactNode) => {
                          if (React.isValidElement(child)) {
                            return !(
                              React.isValidElement(child) &&
                              "props" in child &&
                              (child.props as { href?: string }).href?.includes(
                                "user-content-fnref-"
                              )
                            );
                          }
                          return true;
                        }
                      );

                      return (
                        <FootnoteBackReference href={href}>
                          {filtered}
                        </FootnoteBackReference>
                      );
                    }
                    return child;
                  }
                  return child;
                })}
              </li>
            );
          }
          return (
            <li className={cn("ml-2 mt-2 list-item", className)}>{children}</li>
          );
        },
      }}
    >
      {content}
    </MarkdownAsync>
  );
}
