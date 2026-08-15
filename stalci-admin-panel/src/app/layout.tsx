import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "STALCI Studio — Enterprise Admin Console",
  description: "Global IT Services, Sovereign AI, Cloud Architecture & Client Operations Console",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light h-full antialiased">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-canvas text-ink font-sans selection:bg-copper/20 selection:text-copper-soft">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
