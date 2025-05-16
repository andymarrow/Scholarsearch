// Simple in-memory cache for AI-enhanced queries
const queryCache: Record<string, { enhancedQuery: string; timestamp: number }> = {}
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

// Function to enhance search query using Gemini AI
export async function enhanceSearchQuery(query: string): Promise<string> {
  // Check cache first
  const cachedItem = queryCache[query]
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
    console.log("Using cached enhanced query for:", query)
    return cachedItem.enhancedQuery
  }

  // If Gemini API key is not available, return the original query
  if (!process.env.GEMINI_API_KEY) {
    console.warn("Gemini API key not found. Using original query.")
    return query
  }

  try {
    const response = await fetch(  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an academic research assistant. Your task is to enhance the following search query to make it more effective for finding relevant academic papers. The enhanced query should be more specific, use academic terminology, and include relevant keywords. Only return the enhanced query, nothing else.

Original query: "${query}"

Enhanced query:`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 100,
          topP: 0.8,
          topK: 40,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()

    // Extract the generated text from Gemini's response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    // If Gemini returns an empty result, return the original query
    if (!generatedText.trim()) {
      return query
    }

    const enhancedQuery = generatedText.trim()

    // Cache the result
    queryCache[query] = { enhancedQuery, timestamp: Date.now() }

    return enhancedQuery
  } catch (error) {
    console.error("Error enhancing search query:", error)
    // In case of error, return the original query
    return query
  }
}
