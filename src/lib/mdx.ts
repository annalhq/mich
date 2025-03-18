/* eslint-disable */
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import path from "path";
import readingTime from "reading-time";

export interface Post {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  readingTime: string;
}

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

async function readMDXFile(filePath: string): Promise<Post> {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  const { text: readingTimeText } = readingTime(content);

  // Process the MDX content with rehype plugins
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode as any, { theme: "github-dark" }],
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    },
    parseFrontmatter: false,
  });

function readMDXFile(filePath: string): Post {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  const { text: readingTimeText } = readingTime(content);

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    slug: path.basename(filePath, ".mdx"),
    content: JSON.stringify(mdxSource),
    content,
    readingTime: readingTimeText,
  };
}

async function getMDXData(source: "blog" | "space"): Promise<Post[]> {
  const contentDir = path.join(process.cwd(), "content", source);
  const mdxFiles = getMDXFiles(contentDir);
  const postsPromises = mdxFiles.map((file) =>
    readMDXFile(path.join(contentDir, file))
  );

  const posts = await Promise.all(postsPromises);

function getMDXData(source: "blog" | "space"): Post[] {
  const contentDir = path.join(process.cwd(), "content", source);
  const mdxFiles = getMDXFiles(contentDir);
  const posts = mdxFiles.map((file) =>
    readMDXFile(path.join(contentDir, file))
  );

  return source === "blog"
    ? posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : posts;
}

export async function getBlogPosts(): Promise<Post[]> {
  return getMDXData("blog");
}

export async function getSpaceEntries(): Promise<Post[]> {
  return getMDXData("space");
}

export async function getPost(
  source: "blog" | "space",
  slug: string
): Promise<Post | null> {
export function getBlogPosts(): Post[] {
  return getMDXData("blog");
}

export function getSpaceEntries(): Post[] {
  return getMDXData("space");
}

export function getPost(source: "blog" | "space", slug: string): Post | null {

  const contentDir = path.join(process.cwd(), "content", source);
  const filePath = path.join(contentDir, `${slug}.mdx`);

  try {
    return await readMDXFile(filePath);
    return readMDXFile(filePath);
  } catch {
    return null;
  }
}
