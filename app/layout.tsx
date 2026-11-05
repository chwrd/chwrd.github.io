import type { Metadata } from "next";
import { Eczar, Work_Sans } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chwrd.github.io";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const eczar = Eczar({
  variable: "--font-eczar",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Howard Cheng — Software/Web Developer",
  description:
    "The personal website of Howard Cheng, a software and web developer.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Howard Cheng — Software/Web Developer",
    description:
      "The personal website of Howard Cheng, a software and web developer.",
    type: "website",
    images: [
      {
        url: "/illustrated-portrait.png",
        alt: "Illustrated portrait of Howard Cheng",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${eczar.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
