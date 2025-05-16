"use client"
import Link from "next/link";
import { SearchForm } from "@/components/search-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  UsersIcon,
  CalendarDaysIcon,
  QuoteIcon,
  ArrowLeftIcon,
} from "lucide-react";

// This Loading component will be rendered while PaperPage data is fetching
export default function LoadingPaperPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Reusing the header from search page for consistency */}
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild className="sm:hidden">
              <Link href="/"><ArrowLeftIcon className="h-4 w-4" /></Link>
            </Button>
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              Scholar<span className="text-emerald-600">Search</span>
            </Link>
          </div>
          <div className="w-full max-w-md">
            <SearchForm />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-6">
            {/* Placeholder for Title */}
            <div className="h-10 bg-muted rounded-md w-3/4"></div>

            {/* Placeholder for Meta Information */}
            <div className="space-y-2">
              <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
                <div className="flex items-center">
                  <UsersIcon className="mr-1.5 h-4 w-4 text-muted-foreground" />
                  <div className="h-4 bg-muted rounded w-48"></div>
                </div>
                <div className="flex items-center">
                  <CalendarDaysIcon className="mr-1.5 h-4 w-4 text-muted-foreground" />
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
                <div className="flex items-center">
                  <QuoteIcon className="mr-1.5 h-4 w-4 text-muted-foreground" />
                  <div className="h-4 bg-muted rounded w-24"></div>
                </div>
              </div>
            </div>

            {/* Placeholder for External Link Button */}
            <div className="h-10 bg-muted rounded-md w-40 mt-4"></div>

            <Separator />

            {/* Placeholder for Abstract */}
            <section>
              <div className="h-6 bg-muted rounded-md w-32 mb-3"></div> {/* Abstract title */}
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </section>

            {/* Placeholder for Fields of Study (optional, can be simpler) */}
            <section>
              <div className="h-6 bg-muted rounded-md w-40 mb-3"></div> {/* Fields of Study title */}
              <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-muted rounded-full w-20"></div>
                <div className="h-6 bg-muted rounded-full w-24"></div>
                <div className="h-6 bg-muted rounded-full w-16"></div>
              </div>
            </section>

            {/* Loading Spinner and Message centered */}
            <div className="flex flex-col items-center justify-center py-10">
              <div className="loader"></div> {/* The green spinner */}
              <h2 className="text-xl font-semibold mt-4">Loading Paper Details...</h2>
              <p className="text-muted-foreground">
                Just a moment while we fetch the information.
              </p>
            </div>

            {/* Placeholder for References (optional, can be simpler) */}
            <section>
              <div className="h-6 bg-muted rounded-md w-32 mb-3"></div> {/* References title */}
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-1"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <div className="h-5 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-2/3 mb-1"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Reusing the footer */}
      <footer className="border-t py-6 mt-12">
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

      {/* Assuming the .loader CSS is in your global styles (e.g., app/globals.css)
          If not, add it here inside <style jsx global> like in the previous example.
      */}
       <style jsx global>{`
        /* If not already in globals.css */
        .loader {
          width: 50px; /* Slightly smaller for this page maybe */
          height: 50px;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          border: 3px solid #f3f3f3; /* Light grey */
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
  );
}