import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_MESSAGE: z
      .string()
      .min(1)
      .optional()
      .default("default message"),
    NEXT_PUBLIC_BASE_URL: z
      .string()
      .url()
      .default(
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://annalhq.vercel.app"
      ),
  },
  runtimeEnv: {
    NEXT_PUBLIC_MESSAGE: process.env.NEXT_PUBLIC_MESSAGE,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
