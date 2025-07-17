// import createBundleAnalyzer from "@next/bundle-analyzer";
import nextMDX from "@next/mdx";
import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

await jiti.import("./src/env/server.ts");

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

// const withBundleAnalyzer = createBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: true,
// });

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
