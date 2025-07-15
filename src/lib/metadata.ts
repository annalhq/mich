import { getOgImage } from "@/lib/og";

export const rootMetadata = {
  title: "annenso",
  description: "mein zuhause im internet",
  openGraph: {
    title: "annenso",
    description: "mein zuhause im internet",
    url: "/",
    images: [
      {
        url: getOgImage({
          title: "annenso",
          description: "mein zuhause im internet",
        }),
        width: 1200,
        height: 630,
        alt: "annenso",
      },
    ],
  },
};

export const blogMetadata = {
  title: "Blog",
  description: "Thoughts on technology, life, and everything in between.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on technology, life, and everything in between.",
    type: "website",
    url: "/blog",
    images: [
      {
        url: getOgImage({
          title: "Blog",
          description:
            "Thoughts on technology, life, and everything in between.",
          type: "Blog",
        }),
        width: 1200,
        height: 630,
        alt: "Blog",
      },
    ],
  },
};

export const spaceMetadata = {
  title: "Space",
  description: "my q-logs and bookmarks",
  openGraph: {
    title: "Space",
    description: "my q-logs and bookmarks",
    type: "website",
    url: "/space",
    images: [
      {
        url: getOgImage({
          title: "Space",
          description: "my q-logs and bookmarks",
          type: "Space",
        }),
        width: 1200,
        height: 630,
        alt: "Space",
      },
    ],
  },
};
