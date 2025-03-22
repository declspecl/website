import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DuckDuckCode",
  description: "DuckDuckCode",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <NavBar>{children}</NavBar>
      </body>
    </html>
  );
}
