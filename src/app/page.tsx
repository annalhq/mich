"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full flex-col px-4 pt-4 md:w-2/3 lg:w-1/2">
        <div className="flex items-center gap-4">
          <Image
            src="/enso.jpg"
            alt="profile picture"
            width={64}
            height={64}
            className="h-12 w-12 rounded-full border border-gray-700 md:h-12 md:w-12"
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
          currently i am implementing papers from on{" "}
          <Link href="https://docs.cleanrl.dev/">reinforcement learning</Link>
        </p>

        {/* Links Section */}
        <div className="mt-4 flex gap-4 md:gap-8">
          <Link
            href="https://github.com/annalhq"
            className="flex items-center text-[16px] underline md:text-[18px]"
          >
            <ArrowUpRight className="mr-1 h-4 w-4" /> github
          </Link>
          <Link
            href="https://zhihu.com/annalhq_"
            className="flex items-center text-[16px] underline md:text-[18px]"
          >
            <ArrowUpRight className="mr-1 h-4 w-4" /> zhihu
          </Link>
          <Link
            href="https://loj.ac/"
            className="flex items-center text-[16px] underline md:text-[18px]"
          >
            <ArrowUpRight className="mr-1 h-4 w-4" /> libreOJ
          </Link>
        </div>

        {/* Divider */}
        <div className="my-8 inline-block h-[2px] bg-gray-800 px-16"></div>
      </div>
    </div>
  );
}
