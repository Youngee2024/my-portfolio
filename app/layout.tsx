import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-portfolio-five-theta-39.vercel.app"),
  title: "Ibraheem Olawale — UI/UX Designer & Frontend Builder",
  description:
    "Portfolio of Ibraheem Olawale. 60% UI/UX & Product Design, 20% Brand Systems, 20% Frontend Execution.",
  keywords: [
    "UI/UX Designer",
    "Product Designer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Portfolio",
  ],
  authors: [{ name: "Ibraheem Olawale" }],
  openGraph: {
    title: "Ibraheem Olawale — UI/UX Designer & Frontend Builder",
    description:
      "Crafting user-centered digital products, visual brand identities, and production-ready React web applications.",
    url: "https://my-portfolio-five-theta-39.vercel.app",
    siteName: "Ibraheem Olawale Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/projects/uiux/voya.webp",
        width: 1200,
        height: 630,
        alt: "Ibraheem Olawale Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibraheem Olawale — UI/UX Designer & Frontend Builder",
    description:
      "Crafting user-centered digital products and production-ready web applications.",
    images: ["/projects/uiux/voya.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
