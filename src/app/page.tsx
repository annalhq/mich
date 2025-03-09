"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-start space-x-6">
        <Image
          src="/ann.png"
          alt="ann"
          width={100}
          height={100}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-4xl font-medium">annalhq</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            I am currently doing my undergrad with a focus on mathematics and
            machine learning. My research interests lie in the intersection of
            these fields, where I&apos;m interested in exploring how
            mathematical structures can be leveraged to create more
            interpretable models.
          </p>
        </div>
      </div>
    </div>
  );
}
