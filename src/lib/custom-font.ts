import { Baskervville, Inter } from "next/font/google";
import localFont from "next/font/local";

const didot = localFont({
  src: [{ path: "../../public/assets/font/didot/didot.ttf" }],
  variable: "--font-didot",
});

const nimbus = localFont({
  src: [{ path: "../../public/assets/font/nimbus/nimbus-san-l-reg.otf" }],
  variable: "--font-nimbus",
});

const baskervville = Baskervville({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baskervville",
  style: "normal",
});

const baskeritalic = Baskervville({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baskervville",
  style: "italic",
});

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  style: ["normal", "italic"],
});
export { didot, nimbus, baskervville, baskeritalic, inter };
