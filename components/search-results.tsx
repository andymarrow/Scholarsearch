import Link from "next/link"
import { CalendarIcon, FileTextIcon, UserIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Paper } from "@/lib/types"

interface SearchResultsProps {
  results: Paper[]
}

export function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No results found</h2>
        <p className="text-muted-foreground">Try a different search term or broaden your query</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {results.map((paper) => (
        <Card key={paper.paperId} className="overflow-hidden">
          <CardHeader className="pb-3">
            <Link href={`/paper/${paper.paperId}`} className="hover:underline">
              <CardTitle className="text-xl">{paper.title}</CardTitle>
            </Link>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex flex-wrap gap-2 mb-4">
       
              <div className="flex items-center text-sm text-muted-foreground">
                <UserIcon className="mr-1 h-4 w-4" />
                {/* Add a check for paper.authors before mapping */}
                {paper.authors && paper.authors.length > 0 ? (
                  paper.authors.map((author, i) => (
                    <span key={author.authorId || `author-${paper.paperId}-${i}`}> {/* Ensure key is unique */}
                      {author.name}
                      {i < paper.authors.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <span>No authors listed</span>
                )}
              </div>

              {paper.year && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {paper.year}
                </div>
              )}
              {paper.citationCount !== undefined && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <FileTextIcon className="mr-1 h-4 w-4" />
                  {paper.citationCount} citations
                </div>
              )}
            </div>
            <p className="text-muted-foreground line-clamp-3">{paper.abstract || "No abstract available"}</p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 pt-0">
            {paper.fieldsOfStudy?.map((field) => (
              <Badge key={field} variant="outline">
                {field}
              </Badge>
            ))}
            <div className="flex-1"></div>
           
            {paper.url && (
              <Button asChild size="sm">
                <Link href={`/paper/${paper.paperId}`}>View Details</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
