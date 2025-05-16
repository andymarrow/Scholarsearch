// app/paper/[paperId]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPaperDetails } from "@/lib/semantic-scholar";
import type { Paper, Author } from "@/lib/types"; // Make sure this path is correct
import { SearchForm } from "@/components/search-form"; // To reuse in header
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  UsersIcon,
  CalendarDaysIcon,
  QuoteIcon, // Or FileTextIcon
  BookTextIcon,
  ExternalLinkIcon,
  ArrowLeftIcon,
  LinkIcon,
} from "lucide-react";

// It's good practice to define params type
interface PaperPageProps {
  params: { paperId: string };
}

// Function to generate dynamic metadata
export async function generateMetadata({ params }: PaperPageProps): Promise<Metadata> {
  const paper = await getPaperDetails(params.paperId);

  if (!paper) {
    return {
      title: "Paper Not Found - ScholarSearch",
      description: "The requested paper could not be found.",
    };
  }

  return {
    title: `${paper.title} - ScholarSearch`,
    description: paper.abstract?.substring(0, 160) || "View academic paper details on ScholarSearch.",
    robots: "noindex", // Usually, you want search engines to index content pages
                        // but keeping it consistent with search results page for now.
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function PaperPage({ params }: PaperPageProps) {
  const { paperId } = params;
  const paper = await getPaperDetails(paperId);

  if (!paper) {
    // getPaperDetails currently always returns a mock paper if API fails.
    // If it could truly return null, notFound() would be appropriate.
    // For now, this case might not be hit if mock data is always provided.
    notFound();
  }

  const formatAuthors = (authors: Author[]) => {
    if (!authors || authors.length === 0) return "N/A";
    return authors.map((author) => author.name).join(", ");
  };

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
          {/* Back to search (optional, if query context is available or just general back) */}
          {/* <Link href="/search" className="text-sm text-emerald-600 hover:underline mb-4 inline-block">
            <ArrowLeftIcon className="inline-block mr-1 h-4 w-4" />
            Back to Search
          </Link> */}
          
          <article className="space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              {paper.title}
            </h1>

            {/* Meta Information */}
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
                <div className="flex items-center">
                  <UsersIcon className="mr-1.5 h-4 w-4" />
                  <span>{formatAuthors(paper.authors)}</span>
                </div>
                {paper.year && (
                  <div className="flex items-center">
                    <CalendarDaysIcon className="mr-1.5 h-4 w-4" />
                    <span>{paper.year}</span>
                  </div>
                )}
                {paper.citationCount !== undefined && paper.citationCount !== null && (
                  <div className="flex items-center">
                    <QuoteIcon className="mr-1.5 h-4 w-4" />
                    <span>{paper.citationCount} citations</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* External Link */}
            {paper.url && (
              <Button asChild className="mt-4">
                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                  Read Full Paper <ExternalLinkIcon className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}

            <Separator />

            {/* Abstract */}
            {paper.abstract && (
              <section>
                <h2 className="text-xl font-semibold mb-2">Abstract</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {paper.abstract}
                </p>
              </section>
            )}

            {/* Fields of Study */}
            {paper.fieldsOfStudy && paper.fieldsOfStudy.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-3">Fields of Study</h2>
                <div className="flex flex-wrap gap-2">
                  {paper.fieldsOfStudy.map((field) => (
                    <Badge key={field} variant="secondary">
                      {field}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* References */}
            {paper.references && paper.references.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-3">References</h2>
                <div className="space-y-4">
                  {paper.references.map((ref) => (
                    <Card key={ref.paperId} className="overflow-hidden">
                      <CardHeader className="pb-2 pt-4">
                        <Link href={`/paper/${ref.paperId}`} className="hover:underline">
                           <CardTitle className="text-lg">{ref.title || "Title not available"}</CardTitle>
                        </Link>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground space-y-1 pb-4">
                        {ref.authors && ref.authors.length > 0 && (
                          <div className="flex items-center">
                            <UsersIcon className="mr-1.5 h-3.5 w-3.5" />
                            <span>{formatAuthors(ref.authors)}</span>
                          </div>
                        )}
                        {ref.year && (
                           <div className="flex items-center">
                            <CalendarDaysIcon className="mr-1.5 h-3.5 w-3.5" />
                            <span>{ref.year}</span>
                          </div>
                        )}
                         <Button variant="ghost" size="sm" asChild className="text-emerald-600 hover:text-emerald-700 px-0 h-auto py-0.5">
                            <Link href={`/paper/${ref.paperId}`}>
                                View Details <LinkIcon className="ml-1.5 h-3.5 w-3.5" />
                            </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </main>

      {/* Reusing the footer from search page */}
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
    </div>
  );
}