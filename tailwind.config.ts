import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

import { getRadixColorScale } from "./src/lib/radix-util";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: getRadixColorScale("slate"),
        red: getRadixColorScale("red"),
        border: "var(--slate-6)",
        input: "var(--slate-a6)",
        ring: "var(--slate-9)",
        background: "var(--slate-1)",
        foreground: "var(--slate-12)",
        primary: {
          ...getRadixColorScale("slate"),
          DEFAULT: "var(--slate-9)",
          foreground: "var(--slate-1)",
        },
        destructive: {
          ...getRadixColorScale("red"),
          DEFAULT: "var(--red-9)",
          foreground: "var(--red-1)",
        },
        muted: {
          DEFAULT: "var(--slate-3)",
          foreground: "var(--slate-11)",
        },
        accent: {
          DEFAULT: "var(--slate-a3)",
          foreground: "var(--slate-12)",
        },
        popover: {
          DEFAULT: "var(--slate-1)",
          foreground: "var(--slate-12)",
        },
        card: {
          DEFAULT: "var(--slate-1)",
          foreground: "var(--slate-12)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            ":is(h1, h2, h3, h4, h5) a": {
              "font-weight": "inherit",
              "text-decoration": "none",
            },
            maxWidth: "none",
          },
        },
        xl: {
          css: {
            ":is(h1, h2, h3, h4, h5) a": {
              "font-weight": "inherit",
              "text-decoration": "none",
            },
          },
        },
      }),
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography,
    plugin(({ addUtilities }) => {
      addUtilities({
        ".text-small": {
          // fontSize: "14px",
          letterSpacing: "0.01px",
        },
        ".text-default": {
          //fontSize: "14px",
          lineHeight: "21px",
          letterSpacing: "-0.09px",
        },
      });
    }),
  ],
} satisfies Config;
