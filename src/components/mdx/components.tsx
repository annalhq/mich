/* eslint-disable */
import Image from "next/image";

import { Tweet } from "react-tweet";

import { Accordion } from "./accordion";
import { Callout } from "./callout";

// Adding custom components that will be available in MDX
const components = {
  Accordion,
  Callout,
  Tweet: ({ id }: { id: string }) => <Tweet id={id} />,
  img: (props: any) => (
    <div className="my-6">
      <Image
        className="rounded-lg"
        alt={props.alt || ""}
        src={props.src}
        width={700}
        height={400}
        style={{ width: "100%", height: "auto" }}
        priority={false}
      />
      {props.alt && (
        <div className="mt-2 text-center text-sm text-muted-foreground">
          {props.alt}
        </div>
      )}
    </div>
  ),
  // Override default heading components to add anchor links
  h1: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h1 id={id} className="mb-4 mt-8 scroll-mt-20 text-4xl font-bold">
      {children}
    </h1>
  ),
  h2: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h2 id={id} className="mb-4 mt-8 scroll-mt-20 text-3xl font-semibold">
      {children}
    </h2>
  ),
  h3: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h3 id={id} className="mb-4 mt-6 scroll-mt-20 text-2xl font-semibold">
      {children}
    </h3>
  ),
  h4: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h4 id={id} className="mb-4 mt-6 scroll-mt-20 text-xl font-semibold">
      {children}
    </h4>
  ),
  h5: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h5 id={id} className="mb-4 mt-6 scroll-mt-20 text-lg font-semibold">
      {children}
    </h5>
  ),
  h6: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h6 id={id} className="mb-4 mt-6 scroll-mt-20 text-base font-semibold">
      {children}
    </h6>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4 leading-7">{children}</div>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
    if (
      href?.startsWith("https://twitter.com") ||
      href?.startsWith("https://x.com")
    ) {
      return <Tweet id={href.split("/").pop() || ""} />;
    }

    if (href?.startsWith("#")) {
      return (
        <a href={href} className="anchor">
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4"
      >
        {children}
      </a>
    );
  },
};

export default components;
