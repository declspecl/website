import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: {
        default: "DuckDuckCode",
        template: `%s | DuckDuckCode`
    },
    description: "DuckDuckCode"
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={`${inter.variable}`}>{children}</body>
        </html>
    );
}
