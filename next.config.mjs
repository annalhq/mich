import nextMDX from "@next/mdx";
import createJiti from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
await jiti.import("./src/env/server.ts");


const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  /* other config options here */
};

export default withMDX(nextConfig);
