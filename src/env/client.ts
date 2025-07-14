import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_MESSAGE: z
      .string()
      .min(1)
      .optional()
      .default("default message"),
    NEXT_PUBLIC_BASE_URL: z.string().url().default("annalhq.vercel.app"),
  },
  runtimeEnv: {
    // eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_MESSAGE: process.env.NEXT_PUBLIC_MESSAGE,
    // eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
