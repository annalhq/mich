"use client";

import { didot } from "@/lib/custom-font";

import styles from "../styles.module.css";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  href: string;
  id: string;
}

function FootnoteForwardReference({ href, id, children }: Props): JSX.Element {
  const scroll = () => {
    const footnote = document.querySelector(href);

    if (footnote) {
      window.scrollTo({
        top: footnote.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      id={id}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        scroll();
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          scroll();
        }
      }}
      className={`${styles["footnote-forward-reference"]} ${didot.className}`}
    >
      {children}
    </button>
  );
}

export default FootnoteForwardReference;
