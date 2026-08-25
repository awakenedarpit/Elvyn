import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Elvyn",
    template: "%s · Elvyn",
  },
  description:
    "A calm, modern workspace for productivity, planning, learning, and focused work.",
};

export const viewport: Viewport = {
  themeColor: "#0c0d12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-black focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-black/40 focus:ring-offset-2 dark:focus:bg-white dark:focus:text-black dark:focus:ring-white/50 dark:focus:ring-offset-black"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
