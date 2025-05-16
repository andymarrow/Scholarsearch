import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service - ScholarSearch",
  description: "Terms of Service for using ScholarSearch",
}

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

          <section className="mb-8">
            <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-muted-foreground">
              Please read these Terms of Service carefully before using ScholarSearch.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using ScholarSearch, you agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground">
              ScholarSearch is a privacy-focused academic paper search engine that uses the Semantic Scholar API and AI
              to enhance search results. We provide access to publicly available academic papers and research.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">3. Fair Use</h2>
            <p className="text-muted-foreground">
              ScholarSearch is intended for personal, non-commercial research and educational purposes. Please use our
              service responsibly and respect the intellectual property rights of the authors and publishers of the
              papers you access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">4. Limitations</h2>
            <p className="text-muted-foreground mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Use automated tools to scrape or extract data from ScholarSearch</li>
              <li>Attempt to bypass any security measures</li>
              <li>Use ScholarSearch for any illegal purpose</li>
              <li>Interfere with the proper functioning of the service</li>
              <li>Redistribute or republish content accessed through ScholarSearch without proper attribution</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">5. Third-Party Content</h2>
            <p className="text-muted-foreground">
              ScholarSearch provides links to academic papers and research hosted on third-party websites. We are not
              responsible for the content, accuracy, or availability of these third-party resources. Access to full
              papers may require subscriptions or payments to the original publishers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">6. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              ScholarSearch is provided "as is" without warranties of any kind, either express or implied. We do not
              guarantee the accuracy, completeness, or reliability of search results or that the service will be
              uninterrupted or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event shall ScholarSearch be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms of Service at any time. We will notify users of any significant
              changes by posting the new Terms on this page and updating the "Last updated" date.
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
