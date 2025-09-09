import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const newRodin = localFont({
  src: [
    {
      path: "./fonts/NewRodin-Pro.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-newrodinpro",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const metadata = {
  title: "AquaOS - Interactive Portfolio",
  description: "Interactive Desktop Operating System Style Portfolio by Oscar Rapale",
  keywords: "portfolio, web developer, React, Next.js, interactive design",
  author: "Oscar Rapale",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${newRodin.variable}`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
