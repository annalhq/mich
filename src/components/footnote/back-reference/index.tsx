"use client";

import styles from "../styles.module.css";

interface Props {
  href?: string;
  children: React.ReactNode;
}

function FootnoteBackReference({ href, children }: Props): JSX.Element {
  const scroll = () => {
    if (!href) return;
    const footnote = document.querySelector(href);

    if (footnote) {
      const headerOffset = 100;
      const elementPosition =
        footnote.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {children}
      {href && (
        <button
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
          className={styles["footnote-back-reference"]}
        >
          ↩
        </button>
      )}
    </>
  );
}

export default FootnoteBackReference;
