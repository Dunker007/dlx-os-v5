import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0b0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "DLX OS V5 | Mission Control",
  description: "Dunker's Primary Engineering & Operating Dashboard.",
  robots: { index: false, follow: false },
};

import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";

// Dynamically import LuxChat to prevent react-syntax-highlighter from blocking the main thread on load
const LuxChatDynamic = dynamic(() => import("../components/LuxChat"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        {children}
        <LuxChatDynamic />
      </body>
    </html>
  );
}
