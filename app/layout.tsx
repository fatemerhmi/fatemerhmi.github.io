import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fatemeh Rahimi — Senior NLP & AI Scientist",
  description:
    "7+ years building production NLP systems — from transformer fine-tuning to multi-agent LLM pipelines and document understanding. Currently a Senior NLP Scientist at Pythonic AI.",
  keywords: [
    "NLP",
    "Machine Learning",
    "AI",
    "LLM",
    "Transformer",
    "Python",
    "Senior NLP Scientist",
  ],
  authors: [{ name: "Fatemeh Rahimi" }],
  openGraph: {
    title: "Fatemeh Rahimi — Senior NLP & AI Scientist",
    description:
      "7+ years building production NLP systems — transformer fine-tuning, multi-agent LLM pipelines, document understanding.",
    type: "website",
    url: "https://fatemerhmi.github.io",
  },
  twitter: {
    card: "summary",
    title: "Fatemeh Rahimi — Senior NLP & AI Scientist",
    description:
      "7+ years building production NLP systems — transformer fine-tuning, multi-agent LLM pipelines, document understanding.",
    creator: "@Fatemeh__Rahimi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
