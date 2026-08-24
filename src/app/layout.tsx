import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elvyn",
  description:
    "A calm, modern workspace for productivity, planning, learning, and focused work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
