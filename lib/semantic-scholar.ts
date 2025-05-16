// semantic-scholar.ts (or your equivalent file)
import type { Paper } from "./types"

const API_URL = "https://api.semanticscholar.org/graph/v1"

// Simple in-memory cache for API responses
const cache: Record<string, { data: any; timestamp: number }> = {}
const CACHE_DURATION_API = 24 * 60 * 60 * 1000 // 24 hours for API cache

// Simple in-memory cache for Gemini-generated mock data
const geminiMockCache: Record<string, { data: any; timestamp: number }> = {}
const CACHE_DURATION_GEMINI_MOCK = 1 * 60 * 60 * 1000 // 1 hour for Gemini mock cache to reduce Gemini API calls

// --- Gemini Helper for Mock Data Generation ---
async function generateMockDataWithGemini(prompt: string, cacheKey: string): Promise<any> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("Gemini API key not found. Cannot generate mock data with AI.")
    return null
  }

  // Check Gemini mock cache first
  const cachedItem = geminiMockCache[cacheKey]
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION_GEMINI_MOCK) {
    console.log("Using cached Gemini-generated mock data for:", cacheKey)
    return cachedItem.data
  }

  console.log("Generating mock data with Gemini for:", cacheKey)
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent", { // Using v1beta and latest
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY!,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7, // Slightly more creative for mock data
          maxOutputTokens: 2048, // Allow more tokens for potentially larger JSON
          topP: 0.9,
          topK: 40,
          responseMimeType: "application/json", // Request JSON output directly
        },
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Gemini API error for mock data: ${response.status} - ${errorBody}`)
    }

    const data = await response.json()
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!generatedText) {
      throw new Error("Gemini returned no text for mock data.")
    }

    const jsonData = JSON.parse(generatedText) // Gemini should return valid JSON due to responseMimeType
    geminiMockCache[cacheKey] = { data: jsonData, timestamp: Date.now() }
    return jsonData
  } catch (error) {
    console.error("Error generating mock data with Gemini:", error)
    return null // Fallback if Gemini fails
  }
}

// --- Original Hardcoded Mock Data ---
function getHardcodedMockSearchResults(): Paper[] {
  return [
    { paperId: "fallback-649def34f8be52c8b66281af98ae884c09aef38b", title: "Fallback: Advances in ML (Hardcoded)", abstract: "This is hardcoded fallback search data.", year: 2023, authors: [{ authorId: "author1", name: "Jane Smith" }], citationCount: 10, fieldsOfStudy: ["Fallback"], url: "https://example.com/fallback1",},
    { paperId: "fallback-d2a0f3e8c1b76d5f9a2e4c0318d7b6a59f4e2c10", title: "Fallback: NLP in Healthcare (Hardcoded)", abstract: "This is another hardcoded fallback search data.", year: 2022, authors: [{ authorId: "author3", name: "Alice Johnson" }], citationCount: 5, fieldsOfStudy: ["Fallback"], url: "https://example.com/fallback2",},
  ]
}

function getHardcodedMockPaperDetails(): Paper {
  return { paperId: "fallback-detail-649def34f8be52c8b66281af98ae884c09aef38b", title: "Fallback Detail: Advances in ML (Hardcoded)", abstract: "This is hardcoded fallback paper detail.", year: 2023, authors: [{ authorId: "12345", name: "Jane Smith" }], citationCount: 10, fieldsOfStudy: ["Fallback"], url: "https://example.com/fallback_detail", references: [{ paperId: "ref1", title: "Ref Title", authors: [{authorId: "refauth", name: "Ref Author"}], year: 2020 }]}
}

// --- Gemini-Powered Mock Data Functions ---
// In semantic-scholar.ts

// 1. Refine PAPER_TYPE_DEFINITION_FOR_PROMPT
const PAPER_TYPE_DEFINITION_FOR_PROMPT = `
Strict JSON structure for a single paper object:
{
  "paperId": "string", // A unique identifier for the paper.
  "title": "string",
  "abstract": "string | null",
  "url": "string | null", // e.g., "https://www.semanticscholar.org/paper/..." or a placeholder
  "year": "number | null", // Between 2000 and current year
  "authors": [ { "authorId": "string | null", "name": "string" } ] | null, // 1-5 authors. authorId can be a short numeric string or null.
  "citationCount": "number | null", // Realistic number
  "fieldsOfStudy": [ "string" ] | null, // 1-3 relevant fields
  "references": [ { "paperId": "string | null", "title": "string", "authors": [ { "authorId": "string | null", "name": "string" } ] | null, "year": "number | null" } ] | null // For paper details, 2-3 references. For search results, this field can be omitted or null.
}
Ensure the output is ONLY the JSON data, no other text or explanations. Adhere strictly to the types and structure provided.
`;

// 2. Refine prompt in getMockSearchResults to specify paperId generation
async function getMockSearchResults(query: string): Promise<Paper[]> {
  const prompt = `
You are an API data simulator. Your task is to generate a JSON array of 3 academic paper objects that would be relevant search results for the query: "${query}".
For each paper object in the array, for its "paperId" field, you MUST generate a unique, realistic-looking SHA1-like hex string (e.g., "649def34f8be52c8b66281af98ae884c09aef38b").
Each paper object must strictly follow this structure:
${PAPER_TYPE_DEFINITION_FOR_PROMPT}
For these search results, the 'references' field in each paper object should be omitted or set to null.
Make the paper titles, abstracts, and fields of study highly relevant to the query "${query}".
Generate realistic-sounding but fictional data.
Output only the JSON array.
`;
  const geminiCacheKey = `gemini_search_mock:${query}`;
  const geminiData = await generateMockDataWithGemini(prompt, geminiCacheKey);

  if (geminiData && Array.isArray(geminiData) && geminiData.length > 0) {
    if (geminiData.every(p => p.paperId && p.title)) {
        console.log("Using Gemini-generated mock search results for query:", query);
        return geminiData as Paper[];
    } else {
        console.warn("Gemini-generated search data failed validation for query:", query);
    }
  }
  console.log("Falling back to hardcoded mock search results for query:", query);
  return getHardcodedMockSearchResults();
}


// 3. Refine prompt and validation in getMockPaperDetails
async function getMockPaperDetails(paperIdFromRequest: string, originalQueryHint?: string): Promise<Paper | null> {
  const hint = originalQueryHint ? `The paper might be related to a search for: "${originalQueryHint}".` : "";
  const prompt = `
You are an API data simulator. Your task is to generate a single JSON object for an academic paper.
The "paperId" for the paper in your JSON response MUST BE EXACTLY: "${paperIdFromRequest}". Do NOT generate a new or different paperId.

The paper object must strictly follow this structure:
${PAPER_TYPE_DEFINITION_FOR_PROMPT}

For this detailed paper view, include 2-3 realistic 'references' in the paper object.
Make the paper title, abstract, and fieldsOfStudy plausible and academic. ${hint}
Generate realistic-sounding but fictional data.
Output only the JSON object, adhering strictly to the structure and the required paperId.
`;
  const geminiCacheKey = `gemini_paper_mock:${paperIdFromRequest}:${originalQueryHint || ''}`;
  const geminiData = await generateMockDataWithGemini(prompt, geminiCacheKey);

  if (geminiData && typeof geminiData === 'object' && geminiData.paperId === paperIdFromRequest && geminiData.title) {
      // Successfully got data with the correct paperId
      console.log("Using Gemini-generated mock paper details for ID:", paperIdFromRequest);
      return geminiData as Paper;
  } else if (geminiData && typeof geminiData === 'object' && geminiData.paperId !== paperIdFromRequest) {
      // Gemini generated data but used the wrong paperId
      console.warn(`Gemini generated mock paper details with WRONG paperId. Expected: ${paperIdFromRequest}, Got: ${geminiData.paperId}. Attempting to fix.`);
      if (geminiData.title) { // If rest of the data seems okay
        (geminiData as any).paperId = paperIdFromRequest; // Force the correct paperId
        console.log("Corrected paperId and using Gemini-generated mock paper details for ID:", paperIdFromRequest);
        return geminiData as Paper;
      } else {
        console.error("Gemini data for mock paper details is malformed beyond just incorrect paperId for ID:", paperIdFromRequest);
      }
  } else if (geminiData) {
    // Gemini data is present but doesn't meet basic criteria (e.g., missing title, not an object)
    console.warn("Gemini-generated paper data failed validation (e.g. missing title, wrong type) for ID:", paperIdFromRequest, "Data:", JSON.stringify(geminiData).substring(0,100));
  }
  
  console.log("Falling back to hardcoded mock paper details for ID:", paperIdFromRequest);
  // Note: The hardcoded mock will have its own predefined paperId, not paperIdFromRequest.
  // This is a known limitation of the final hardcoded fallback.
  return getHardcodedMockPaperDetails();
}


// Function to get data from cache or fetch it
async function fetchWithCache(url: string, options: RequestInit, cacheKey: string, cacheDuration = CACHE_DURATION_API) {
  const cachedItem = cache[cacheKey]
  if (cachedItem && Date.now() - cachedItem.timestamp < cacheDuration) {
    console.log("Using API cached data for:", cacheKey)
    return cachedItem.data
  }

  const maxRetries = 3
  let retryCount = 0
  let lastError: Error | null = null

  while (retryCount < maxRetries) {
    try {
      if (retryCount > 0) {
        const delay = 5000 * Math.pow(2, retryCount - 1)
        console.log(`Retry attempt ${retryCount}, waiting ${delay}ms for ${cacheKey}`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }

      const response = await fetch(url, options)

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After")
        const waitTime = retryAfter ? Number.parseInt(retryAfter) * 1000 : 10000 * Math.pow(2, retryCount)
        console.log(`Rate limited for ${cacheKey}. Waiting ${waitTime}ms. (Attempt ${retryCount + 1}/${maxRetries})`)
        await new Promise((resolve) => setTimeout(resolve, waitTime))
        retryCount++
        lastError = new Error(`Rate limited (status 429) for ${cacheKey}`)
        continue
      }

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(`API error for ${cacheKey}: ${response.status} - ${response.statusText}. Body: ${errorBody}`)
      }

      const data = await response.json()
      cache[cacheKey] = { data, timestamp: Date.now() }
      return data
    } catch (error) {
      lastError = error as Error
      retryCount++
      console.error(`Attempt ${retryCount}/${maxRetries} failed for ${cacheKey}:`, error)
    }
  }

  // Fallback logic if API fails after retries

  // Try expired cache first
  if (cachedItem) {
    console.log("Using EXPIRED API cached data as fallback for:", cacheKey)
    return cachedItem.data
  }
  
  console.log("All API retries failed for:", cacheKey, ". Attempting to use AI-generated mock data.")

  if (cacheKey.startsWith("search:")) {
    const query = decodeURIComponent(cacheKey.substring("search:".length))
    console.log("Using AI-generated mock search results as fallback for query:", query)
    // Semantic Scholar search API returns { total: number, offset: number, data: Paper[] }
    // So our mock needs to be wrapped similarly if searchPapers expects this structure.
    // Looking at searchPapers, it expects responseData.data.
    // So getMockSearchResults should return Paper[] and fetchWithCache should wrap it.
    const mockPapers = await getMockSearchResults(query)
    return { data: mockPapers, total: mockPapers.length, offset: 0 } // Simulate the API structure
  } else if (cacheKey.startsWith("paper:")) {
    const paperId = decodeURIComponent(cacheKey.substring("paper:".length))
     // We might not have the original query here, so pass undefined or extract if possible
    console.log("Using AI-generated mock paper details as fallback for paperId:", paperId)
    return await getMockPaperDetails(paperId) // This mock function returns the paper object directly
  }

  throw lastError || new Error(`Failed to fetch data for ${cacheKey} after multiple retries and no fallback available.`)
}

// Function to search for papers
export async function searchPapers(query: string): Promise<Paper[]> {
  try {
    const sanitizedQuery = encodeURIComponent(query)
    const url = `${API_URL}/paper/search?query=${sanitizedQuery}&fields=paperId,title,abstract,url,year,authors,citationCount,fieldsOfStudy&limit=10` // Reduced limit
    const cacheKey = `search:${sanitizedQuery}` // Keep sanitized query for cache key

    const responseData = await fetchWithCache(
      url,
      { headers: { /* "x-api-key": "YOUR_S2_API_KEY" (if you get one) */ } },
      cacheKey,
    )
    console.log("Search API response structure:", responseData); // Log to see what comes back

    // S2 API for search: { total: number, offset: number, next: number, data: Paper[] }
    // If responseData is directly Paper[] (from Gemini mock), then it's fine.
    // If responseData is { data: Paper[] } (from fetchWithCache's Gemini mock wrapper), then use responseData.data
    if (responseData && responseData.data && Array.isArray(responseData.data)) {
        return responseData.data;
    } else if (Array.isArray(responseData)) { // Directly got an array (e.g. from expired cache of direct Gemini mock)
        return responseData;
    }
    // If the API call was successful but returned no data field or empty data
    console.warn("Search for query", query, "returned unexpected data structure or empty data from API/cache:", responseData);
    return [];

  } catch (error) {
    console.error(`Error searching papers for query "${query}":`, error)
    // Fallback to Gemini-generated mock data directly if fetchWithCache threw an error before providing mocks
    const mockPapers = await getMockSearchResults(query) // Pass original non-sanitized query
    return mockPapers
  }
}

// Function to get paper details
export async function getPaperDetails(paperId: string): Promise<Paper | null> {
  try {
    // Sanitize the paper ID
    const sanitizedPaperId = encodeURIComponent(paperId)
    const actualPaperId = sanitizedPaperId.startsWith("S2PaperId%3A")
      ? sanitizedPaperId.substring("S2PaperId%3A".length)
      : sanitizedPaperId

    const url = `${API_URL}/paper/${actualPaperId}?fields=paperId,title,abstract,url,year,authors,citationCount,fieldsOfStudy,references.paperId,references.title,references.year,references.authors`
    const cacheKey = `paper:${actualPaperId}` // Keep actualPaperId for cache key

    // The fetchWithCache will return the Paper object directly from API or Gemini mock
    const data = await fetchWithCache(
      url,
      { headers: { /* "x-api-key": "YOUR_S2_API_KEY" */ } },
      cacheKey,
    )
    // S2 API for paper details returns the Paper object directly. Gemini mock also returns Paper object.
    if (data && data.paperId) { // Basic check
        return data as Paper;
    }
    console.warn("Get paper details for", paperId, "returned unexpected data structure from API/cache:", data);
    return null;

  } catch (error) {
    console.error(`Error getting paper details for ${paperId}:`, error)
    // Fallback to Gemini-generated mock data directly
    // We don't have original query hint here, but it's optional for getMockPaperDetails
    return await getMockPaperDetails(paperId) // Pass original paperId
  }
}


// The enhanceSearchQuery function remains the same as you provided
// Ensure GEMINI_API_KEY is in your .env.local or environment variables
// ... (your enhanceSearchQuery function)
export async function enhanceSearchQuery(query: string): Promise<string> {
  // Check cache first (this is your existing queryCache for enhancements)
  const queryCache: Record<string, { enhancedQuery: string; timestamp: number }> = {} // Define locally if not global
  const CACHE_DURATION_ENHANCE = 7 * 24 * 60 * 60 * 1000 // 7 days

  const cachedItem = queryCache[query]
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION_ENHANCE) {
    console.log("Using cached enhanced query for:", query)
    return cachedItem.enhancedQuery
  }

  if (!process.env.GEMINI_API_KEY) {
    console.warn("Gemini API key not found for query enhancement. Using original query.")
    return query
  }

  try {
    const response = await fetch(  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent", { // Using v1beta
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
          // No responseMimeType here, as we expect plain text
        },
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API error for query enhancement: ${response.status} - ${errorBody}`)
    }

    const data = await response.json()
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    if (!generatedText.trim()) {
      console.warn("Gemini returned empty enhancement for query:", query, ". Using original.")
      return query
    }
    const enhancedQuery = generatedText.trim()
    queryCache[query] = { enhancedQuery, timestamp: Date.now() } // Cache the enhancement
    return enhancedQuery
  } catch (error) {
    console.error("Error enhancing search query:", error)
    return query
  }
}