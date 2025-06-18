import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { EB_Garamond } from "next/font/google"
import { Work_Sans } from "next/font/google"
import "./globals.css"
import NavBar from "./components/NavBar"
import TopBar from "./components/TopBar"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { AuthProvider } from "./context/AuthContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-WorkSans",
})

export const metadata: Metadata = {
  title: "Temade",
  description: "See Buy Temade E-commerce",
  icons: {
    icon: "/temade-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} ${workSans.variable} bg-[#FFFBEB] antialiased text-black dark:bg-[#111111] dark:text-white`}
      >
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <TopBar />
              <NavBar />
              {children}
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
