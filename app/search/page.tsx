import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SearchResults } from "@/components/search-results"
import { SearchForm } from "@/components/search-form"
import { enhanceSearchQuery } from "@/lib/ai-search"
import { searchPapers } from "@/lib/semantic-scholar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangleIcon } from "lucide-react"
import { useEffect } from "react"

export const metadata: Metadata = {
  title: "Search Results - ScholarSearch",
  description: "View your academic paper search results",
  robots: "noindex",
}

export const dynamic = "force-dynamic"
export const revalidate = 3600 // Revalidate every hour

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q
console.log("Received query:", query)
  if (!query) {
    notFound()
  }
//  useEffect(() => {
//   console.log(query)
// }, [query])


  let enhancedQuery = query
  let results = []
  let apiError = false

  try {
    // Enhance the search query with AI
    enhancedQuery = await enhanceSearchQuery(query)

    // Fetch search results
    results = await searchPapers(enhancedQuery)
  } catch (error) {
    console.error("Error in search page:", error)
    apiError = true
    // We'll still show the page with an error message
    // The searchPapers function should return mock data as fallback
    results = await searchPapers(query).catch(() => [])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            Scholar<span className="text-emerald-600">Search</span>
          </Link>
          <div className="w-full max-w-md">
            <SearchForm />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        {apiError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>API Limitation</AlertTitle>
            <AlertDescription>
              We're experiencing high traffic or rate limiting from our data provider. Some results may be limited or
              from our cache. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Results for "{query}"</h1>
          {enhancedQuery !== query && !apiError && (
            <p className="text-sm text-muted-foreground">AI enhanced search: "{enhancedQuery}"</p>
          )}
        </div>
        <SearchResults results={results} />
      </main>
      <footer className="border-t py-6">
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
