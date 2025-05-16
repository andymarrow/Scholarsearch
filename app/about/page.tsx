import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About - ScholarSearch",
  description: "Learn about ScholarSearch, our mission, and our privacy commitment",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container flex items-center py-4">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            Scholar<span className="text-emerald-600">Search</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About ScholarSearch</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              ScholarSearch was created to provide a privacy-focused way to search for academic papers. We believe that
              research and knowledge should be accessible to everyone without compromising their privacy or being
              tracked across the web.
            </p>
            <p className="text-muted-foreground">
              Our goal is to make academic research more accessible while respecting user privacy and providing an
              enhanced search experience powered by AI.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">How It Works</h2>
            <p className="text-muted-foreground mb-4">
              ScholarSearch uses the Semantic Scholar API to access a vast database of academic papers. When you search,
              we enhance your query using Google's Gemini AI to help you find the most relevant papers, even if they
              don't exactly match your search terms.
            </p>
            <p className="text-muted-foreground">
              All search processing happens on the server, and we don't store your search history or track your behavior
              on the site. We don't use cookies for tracking or profiling.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Privacy Commitment</h2>
            <p className="text-muted-foreground mb-4">We are committed to protecting your privacy. Here's how:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>No tracking cookies or user profiling</li>
              <li>No collection of personal data</li>
              <li>No ads or third-party trackers</li>
              <li>No selling or sharing of search data</li>
              <li>All connections secured with HTTPS</li>
              <li>Strict Content Security Policy to prevent XSS attacks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Technology</h2>
            <p className="text-muted-foreground mb-4">ScholarSearch is built with:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Next.js (Static Site Generation)</li>
              <li>Semantic Scholar API</li>
              <li>Google Gemini AI for query enhancement</li>
              <li>Tailwind CSS for responsive design</li>
              <li>Vercel for hosting</li>
            </ul>
          </section>
        </div>
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
