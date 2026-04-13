import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fatemeh Rahimi — Lead Data Scientist | NLP & AI",
  description:
    "Lead Data Scientist with 7+ years building production NLP systems, LLM workflows, and document understanding products. Currently leading applied AI work at Pythonic AI.",
  keywords: [
    "Lead Data Scientist",
    "NLP",
    "Machine Learning",
    "AI",
    "LLM",
    "Transformer",
    "Python",
  ],
  authors: [{ name: "Fatemeh Rahimi" }],
  openGraph: {
    title: "Fatemeh Rahimi — Lead Data Scientist | NLP & AI",
    description:
      "Lead Data Scientist with 7+ years building production NLP systems, LLM workflows, and document understanding products.",
    type: "website",
    url: "https://fatemerhmi.github.io",
  },
  twitter: {
    card: "summary",
    title: "Fatemeh Rahimi — Lead Data Scientist | NLP & AI",
    description:
      "Lead Data Scientist with 7+ years building production NLP systems, LLM workflows, and document understanding products.",
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
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
