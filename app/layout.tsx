import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from './providers';
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ticktock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
