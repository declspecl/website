import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "DuckDuckCode - AI DevTool",
    description: "Code smarter, not harder. Effortless coding is here. Our AI DevTool simplifies coding for everyone, tech or not.",
    keywords: ["AI DevTool", "Code Generation", "Pull Request", "Git", "Repository", "Automated Coding", "DuckDuckCode"],
    authors: [{
        name: 'DuckDuckCode'
    }],
    openGraph: {
        title: 'DuckDuckCode - AI DevTool',
        description: "Code smarter, not harder. Effortless coding is here. Our AI DevTool simplifies coding for everyone, tech or not.",
        url: 'https://www.duckduckcode.com', // Replace with your actual URL
        siteName: 'DuckDuckCode',
        images: [
            {
                url: 'https://www.duckduckcode.com/logo.png',
                width: 800,
                height: 600,
            },
            {
                url: 'https://www.duckduckcode.com/t-logo.png',
                width: 1800,
                height: 1600,
                alt: 'DuckDuckCode Logo',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': 'standard',
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        card: 'summary_large_image',
        title: 'DuckDuckCode - AI DevTool',
        description: "Code smarter, not harder. Effortless coding is here. Our AI DevTool simplifies coding for everyone, tech or not.",
        images: ['https://www.duckduckcode.com/logo.png'],
        creator: '@DuckDuckCode',
    },
    verification: {
        google: 'google',
    }
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
