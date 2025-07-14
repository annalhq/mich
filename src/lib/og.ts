import { type Post } from "@/mdx";

export type OgImageProps = {
  title: string;
  description: string;
  type: "Blog" | "Space";
  date?: string;
  readingTime?: string;
};

export function getOgImage(
  data: Partial<Post> & { type: "Blog" | "Space" }
): string {
  const { title, description, type, date, readingTime } = data;
  // eslint-disable-next-line n/no-process-env
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og`);

  if (title) url.searchParams.set("title", title);
  if (description) url.searchParams.set("description", description);
  if (type) url.searchParams.set("type", type);
  if (date) url.searchParams.set("date", date);
  if (readingTime) url.searchParams.set("readingTime", readingTime);

  return url.toString();
}
