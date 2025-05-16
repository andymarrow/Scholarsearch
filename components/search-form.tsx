"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    console.log(query)
    e.preventDefault()
    if (query.trim()) {
      // Sanitize input before using in URL
      const sanitizedQuery = encodeURIComponent(query.trim())
      router.push(`/search?q=${sanitizedQuery}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Input
          type="search"
          placeholder="Search for papers, authors, or topics..."
          className="pr-12 h-12 rounded-full border-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search query"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-1 h-10 w-10 rounded-full bg-emerald-600 hover:bg-emerald-700"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  )
}
