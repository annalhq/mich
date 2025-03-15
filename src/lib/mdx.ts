import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";

// For reading time calculation
function readingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getPost(folder: string, slug: string) {
  const filePath = path.join(process.cwd(), "content", folder, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  const codeOptions = {
    theme: "one-dark-pro",
    keepBackground: true,
    grid: true,
  };

  // Extract frontmatter
  const matterRegex = /---\s*([\s\S]*?)\s*---/;
  const matterMatch = fileContent.match(matterRegex);
  const frontMatterBlock = matterMatch ? matterMatch[1] : "";

  // Parse frontmatter
  const frontmatter: Record<string, string> = {};
  frontMatterBlock.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      const value = valueParts.join(":").trim();
      frontmatter[key.trim()] = value.replace(/^"(.*)"$/, "$1");
    }
  });

  // Serialize MDX content without custom components - we'll add them on the client side
  const mdxSource = await serialize(fileContent, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkImages],
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode, codeOptions],
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ],
    },
  });

  return {
    slug,
    content: mdxSource,
    readingTime: readingTime(fileContent),
    title: frontmatter.title || "Untitled",
    description: frontmatter.description || "",
    date: frontmatter.date || new Date().toISOString().split("T")[0],
  };
}

export async function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Simple frontmatter parsing
      const matter = fileContent.match(/---\s*([\s\S]*?)\s*---/);
      const frontMatterBlock = matter ? matter[1] : "";

      // Extract title, description, and date
      const frontmatter: Record<string, string> = {};
      frontMatterBlock.split("\n").forEach((line) => {
        const [key, ...valueParts] = line.split(":");
        if (key && valueParts.length) {
          const value = valueParts.join(":").trim();
          // Remove quotes if they exist
          frontmatter[key.trim()] = value.replace(/^"(.*)"$/, "$1");
        }
      });

      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: frontmatter.title || "Untitled",
        description: frontmatter.description || "",
        date: frontmatter.date || new Date().toISOString().split("T")[0],
        readingTime: readingTime(fileContent),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
