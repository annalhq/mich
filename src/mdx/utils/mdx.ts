import fs from "fs";
import matter from "gray-matter";
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

function readMDXFile(filePath: string): Post {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  const { text: readingTimeText } = readingTime(content);

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    slug: path.basename(filePath, ".mdx"),
    content,
    readingTime: readingTimeText,
  };
}

function getMDXData(source: "blog" | "space"): Post[] {
  const contentDir = path.join(process.cwd(), "content", source);
  const mdxFiles = getMDXFiles(contentDir);
  const posts = mdxFiles.map((file) =>
    readMDXFile(path.join(contentDir, file))
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

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
    return readMDXFile(filePath);
  } catch {
    return null;
  }
}
