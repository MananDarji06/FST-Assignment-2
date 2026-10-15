import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Lumis — Premium Studio Collection",
  description: "A curated selection of precision studio hardware, workspace tools, and acoustic modules.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900`}
      >
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-10 mt-16 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono tracking-widest text-slate-500 uppercase text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Lumis Platform • Production Core</span>
            </div>
            <div className="text-slate-400">
              © {new Date().getFullYear()} Lumis Studio. Precision architecture &amp; transactional commerce.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}