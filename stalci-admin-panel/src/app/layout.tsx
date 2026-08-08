import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stalci Admin Panel",
  description: "Manage your Stalci Showcase Studio portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
