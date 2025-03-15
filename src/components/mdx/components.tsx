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
      {props.alt ? (
        <div className="mt-2 text-center text-sm text-muted-foreground">
          {props.alt}
        </div>
      ) : null}
    </div>
  ),
  // Override default heading components to add anchor links
  h1: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h1 id={id} className="scroll-mt-20">
      {children}
    </h1>
  ),
  h2: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h2 id={id} className="scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h3 id={id} className="scroll-mt-20">
      {children}
    </h3>
  ),
  h4: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h4 id={id} className="scroll-mt-20">
      {children}
    </h4>
  ),
  h5: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h5 id={id} className="scroll-mt-20">
      {children}
    </h5>
  ),
  h6: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h6 id={id} className="scroll-mt-20">
      {children}
    </h6>
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
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export default components;
