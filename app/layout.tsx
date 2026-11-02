import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/clientLayout";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://andrewoche.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Andrew Oche — Full-Stack & AI Engineer",
    template: "%s — Andrew Oche",
  },
  description:
    "Full-Stack, AI & ML Engineer and Founder of Thecla. Building fast, type-safe systems with Next.js and TypeScript, and production ML and agentic AI with Python, PyTorch and LLMs. Available for freelance and contract work.",
  keywords: [
    "Andrew Oche",
    "Full-Stack Developer",
    "AI Engineer",
    "ML Engineer",
    "Machine Learning Engineer",
    "Agentic AI",
    "LLM",
    "Next.js",
    "TypeScript",
    "React",
    "Python",
    "PyTorch",
    "Software Engineer",
    "Lagos",
    "Nigeria",
    "Freelance Developer",
  ],
  authors: [{ name: "Andrew Oche" }],
  creator: "Andrew Oche",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Andrew Oche — Full-Stack & AI Engineer",
    description:
      "Full-Stack, AI & ML Engineer and Founder of Thecla. Building scalable web systems and production ML & agentic AI with Next.js, Python and LLMs.",
    siteName: "Andrew Oche",
    images: [
      {
        url: "/assets/andrew.png",
        width: 1086,
        height: 1448,
        alt: "Andrew Oche — Full-Stack & AI Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Oche — Full-Stack & AI Engineer",
    description:
      "Full-Stack, AI & ML Engineer and Founder of Thecla. Building scalable web systems and production ML & agentic AI with Next.js, Python and LLMs.",
    creator: "@adakole56andrew",
    images: [
      {
        url: "/assets/andrew.png",
        width: 1086,
        height: 1448,
        alt: "Andrew Oche — Full-Stack & AI Engineer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${sans.variable}`}
    >
      <head>
        <link rel="image_src" href="/assets/andrew.png" />
      </head>
      <body className={`${sans.className} min-h-full flex flex-col font-sans bg-[#050506] text-white selection:bg-blue-600/30 selection:text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
