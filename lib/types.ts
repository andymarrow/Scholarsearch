export interface Author {
  authorId: string
  name: string
}

export interface Paper {
  paperId: string
  title: string
  abstract?: string
  url?: string
  year?: number
  authors: Author[]
  citationCount?: number
  fieldsOfStudy?: string[]
  references?: Paper[]
}
