import clsx from "clsx";

import { Layout } from "@/components/layout";
import { Providers } from "@/components/providers";
import { ScreenIndicator } from "@/components/screen-indicator";
import { baskervville, inter } from "@/lib/custom-font";

import "../styles/global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={clsx(inter.variable, "font-sans")}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 120 120%22><text y=%221em%22 font-size=%22100%22>🤗</text></svg>"
        />
      </head>
      <body className={clsx(baskervville.variable, inter.variable)}>
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
