import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers/theme-provider";

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
});

export const metadata = {
  title: "Aqua OS",
  description: "Interactive Desktop Operating System Style Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${newRodin.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
