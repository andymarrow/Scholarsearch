"use client"
import Link from "next/link"
// You can reuse SearchForm for layout consistency, or use a simplified placeholder
import { SearchForm } from "@/components/search-form"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            Scholar<span className="text-emerald-600">Search</span>
          </Link>
          <div className="w-full max-w-md">
            {/* Displaying the search form can maintain layout consistency */}
            <SearchForm />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Green Spinner Animation */}
          <div className="loader"></div>
          <h1 className="text-2xl font-semibold">Loading Search Results...</h1>
          <p className="text-md text-muted-foreground">
            Please wait while we fetch and enhance your search. <br />
            Our AI is working its magic! ✨
          </p>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ScholarSearch. All rights reserved.
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

      {/* You can place these styles in your global CSS file (e.g., app/globals.css) 
          or keep them scoped here using <style jsx global> or <style jsx>.
          Using global CSS is often cleaner.
      */}
      <style jsx global>{`
        .loader {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          border: 4px solid #f3f3f3; /* Light grey, Tailwind gray-200 equivalent */
          border-top-color: #10b981; /* Emerald 500 */
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}