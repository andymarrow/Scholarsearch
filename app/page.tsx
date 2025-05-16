import type { Metadata } from "next"
import Link from "next/link"
import { SearchForm } from "@/components/search-form"

export const metadata: Metadata = {
  title: "ScholarSearch - Privacy-Focused Academic Paper Search",
  description: "Search for academic papers without tracking or cookies. Powered by AI for better search results.",
  keywords: "academic papers, research, privacy, search engine, AI search",
  openGraph: {
    title: "ScholarSearch - Privacy-Focused Academic Paper Search",
    description: "Search for academic papers without tracking or cookies. Powered by AI for better search results.",
    url: "https://scholar-search.vercel.app",
    siteName: "ScholarSearch",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ScholarSearch",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-24">
        <div className="w-full max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
            Scholar<span className="text-emerald-600">Search</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A privacy-focused academic paper search engine. No tracking, no cookies, just results.
          </p>
          <SearchForm />
          <div className="text-sm text-muted-foreground">
            <p>Powered by Semantic Scholar API and enhanced with AI for better search results.</p>
            <p className="mt-2">
              <Link href="/about" className="underline underline-offset-4 hover:text-emerald-600">
                Learn more about our privacy commitment
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ScholarSearch. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
