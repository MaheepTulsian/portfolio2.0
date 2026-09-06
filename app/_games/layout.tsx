import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play",
  description:
    "A small arcade of classic games rebuilt from scratch by Maheep Tulsian. Each game tracks your high score locally.",
  alternates: { canonical: "/games" },
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
