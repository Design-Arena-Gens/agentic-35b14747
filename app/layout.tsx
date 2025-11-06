import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YouTube Engagement Assistant | Hindi + English",
  description: "Generate high-retention scripts, hooks, titles, thumbnails, and CTAs for YouTube videos."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
