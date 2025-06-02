import type { Metadata } from "next";
import { Geist, Geist_Mono,  } from "next/font/google";
import { EB_Garamond } from 'next/font/google';
import { Work_Sans } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({ 
  subsets: ['latin'],
  variable: '--font-garamond'
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-WorkSans'
});

export const metadata: Metadata = {
  title: "Temade E-commerce",
  description: "See Buy Temade E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond} ${workSans.variable} bg-[#FFFBEB] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
