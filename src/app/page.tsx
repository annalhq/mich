"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // for now aise hi, will change later to fetch from blogs page
  const recentBlogs = [
    { title: "Understanding Neural Networks", date: "2025-03-01" },
    { title: "Tokenizer in C from scratch", date: "2025-03-01" },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 pt-2">
      <div className="w-full flex-col px-4 pt-4 md:w-2/3 lg:w-1/2">
        <div className="flex items-center gap-4">
          <Image
            src="/ann.png"
            alt="profile picture"
            width={48}
            height={48}
            className="h-10 w-10 rounded-full border border-gray-700 md:h-12 md:w-12"
          />
          <h1 className="text-left font-serif text-xl md:text-2xl">annalhq</h1>
        </div>

        {/* Bio Section */}
        <p className="mt-8 text-[16px] md:text-[18px]">
          hey there 👋. i work in <span>machine learning</span>,{" "}
          <span>mathematics</span> and <span>particle physics</span>.
        </p>
        <p className="mt-4 text-[16px] md:text-[18px]">
          my research interests lie in the intersection of these fields, where
          i&apos;m interested in exploring how mathematical structures can be
          leveraged to create more interpretable models.
        </p>
        <p className="mt-4 text-[16px] md:text-[18px]">
          currently i am implementing papers from{" "}
          <Link href="https://nlp.seas.harvard.edu/code/" className="underline">
            harvard nlp
          </Link> {" "} and on {" "}
          <Link href="https://docs.cleanrl.dev/">
            reinforcement learning
          </Link>
        </p>

        {/* Links Section */}
        <div className="mt-4 flex gap-4 md:gap-8">
          <Link href="/resume" className="text-[16px] underline md:text-[18px]">
            ↗ resume
          </Link>
          <Link
            href="https://github.com/annalhq"
            className="text-[16px] underline md:text-[18px]"
          >
            ↗ github
          </Link>
          <Link
            href="https://zihihu.com/annalhq_"
            className="text-[16px] underline md:text-[18px]"
          >
            ↗ zihihu
          </Link>
        </div>

        {/* Divider */}
        <div className="my-8 inline-block h-[2px] bg-gray-800 px-16"></div>

        {/* Blogs Section */}
        <h1 className="mb-2 mt-8 font-serif text-[16px] md:text-[18px]">
          <span className="font-serif text-neutral-500">Recent</span> blogs{" "}
          <Link href="/blog" className="ml-2">
            →
          </Link>
        </h1>
        <ul className="list-inside">
          {recentBlogs.map((blog, index) => (
            <li key={index} className="my-3 w-full cursor-pointer md:my-4">
              <Link
                className="flex w-full justify-between"
                href={`/blog/${blog.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <p className="text-[16px] lowercase">
                  {index + 1}. {blog.title}
                </p>
                <span className="mr-2 font-mono text-[14px] text-neutral-500">
                  {blog.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
