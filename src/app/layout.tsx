import { Inter } from "next/font/google";

import clsx from "clsx";

import { Layout } from "@/components/layout";
import { Providers } from "@/components/providers";
import { ScreenIndicator } from "@/components/screen-indicator";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(inter.variable, "font-sans")}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 120 120%22><text y=%221em%22 font-size=%22100%22>🤗</text></svg>"
        />
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
          <ScreenIndicator />
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: "annalhq",
  description: "my personal portfolio",
  keywords: [
    "machine learning",
    "particle physics",
    "mathematics",
    "reinforcement learning",
  ],
};
