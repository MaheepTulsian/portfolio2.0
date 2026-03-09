import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { getData } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Maheep Tulsian | Full Stack Developer & AI/ML Engineer",
  description: "Portfolio of Maheep Tulsian - Full Stack Developer & AI/ML Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = getData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <LayoutWrapper
          name={data.personal.name}
          seeking="I am seeking opportunities, feel free to reach out if you have any openings!"
        >
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
