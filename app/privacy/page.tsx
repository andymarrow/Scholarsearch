import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy - ScholarSearch",
  description: "Learn about how ScholarSearch protects your privacy",
}

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <section className="mb-8">
            <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-muted-foreground">
              At ScholarSearch, we take your privacy seriously. This Privacy Policy explains how we handle information
              when you use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Information We Don't Collect</h2>
            <p className="text-muted-foreground mb-4">We believe in minimizing data collection. We do not:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Collect personal information</li>
              <li>Track your search history</li>
              <li>Use cookies for tracking or profiling</li>
              <li>Store IP addresses</li>
              <li>Share any data with third parties</li>
              <li>Use analytics that track individual users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Information We Do Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect minimal information necessary to provide our service:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Anonymous, aggregated usage statistics (total searches, not individual searches)</li>
              <li>Error logs (without personal identifiers) to improve our service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">How We Use Your Search Queries</h2>
            <p className="text-muted-foreground mb-4">When you enter a search query:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Your query is processed on our servers to enhance it with AI</li>
              <li>The enhanced query is sent to the Semantic Scholar API</li>
              <li>Results are returned to you</li>
              <li>Your original query is not stored or logged</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Security Measures</h2>
            <p className="text-muted-foreground mb-4">We implement several security measures to protect our service:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>HTTPS encryption for all connections</li>
              <li>Content Security Policy (CSP) to prevent cross-site scripting attacks</li>
              <li>Cross-Origin Resource Sharing (CORS) restrictions</li>
              <li>Input sanitization to prevent injection attacks</li>
              <li>Regular security updates and audits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify users of any significant changes by
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
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
