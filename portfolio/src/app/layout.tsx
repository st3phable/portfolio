import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const Space_sans = Space_Grotesk({
  variable: "--font-space-sans",
  subsets: ["latin"],
});

const Space_monospace = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: "400", 
});

export const metadata: Metadata = {
  title: "Stephanie Rosales Diaz - Portfolio ",
  description: "A personal showcase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Space_sans.variable} ${Space_monospace.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
