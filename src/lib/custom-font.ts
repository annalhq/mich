import { Inter } from "next/font/google";
import { Instrument_Serif } from "next/font/google";

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  style: "normal",
});

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  style: ["normal", "italic"],
});
export { instrument, inter };
