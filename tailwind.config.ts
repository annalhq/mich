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
        tomato: getRadixColorScale("tomato"),
        border: "var(--gray-6)",
        input: "var(--gray-a6)",
        ring: "var(--tomato-9)",
        background: "var(--gray-1)",
        foreground: "var(--gray-12)",
        primary: {
          ...getRadixColorScale("tomato"),
          DEFAULT: "var(--tomato-9)",
          foreground: "var(--tomato-1)",
        },
        secondary: {
          ...getRadixColorScale("teal"),
          DEFAULT: "var(--teal-9)",
          foreground: "var(--teal-1)",
        },
        destructive: {
          ...getRadixColorScale("red"),
          DEFAULT: "var(--red-9)",
          foreground: "var(--red-1)",
        },
        muted: {
          DEFAULT: "var(--gray-3)",
          foreground: "var(--gray-11)",
        },
        accent: {
          DEFAULT: "var(--gray-a3)",
          foreground: "var(--gray-12)",
        },
        popover: {
          DEFAULT: "var(--gray-1)",
          foreground: "var(--gray-12)",
        },
        card: {
          DEFAULT: "var(--gray-1)",
          foreground: "var(--gray-12)",
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
