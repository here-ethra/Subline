import OpenAI from "openai";

// Replace with actual API keys in production
const NEWS_API_KEY = "pub_86219f1b7c2997d6c78e114577f2a543229b5";
const OPENAI_API_KEY = "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";

// NewsData.io API base URL
const NEWS_API_BASE_URL = "https://newsdata.io/api/1";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, API calls should be made from a backend
});

// News type definition
export interface NewsArticle {
  title: string;
  description: string;
  source: string;
  url: string;
  image_url?: string;
  published_at: string;
  content?: string;
  category?: string[];
  id: string;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  results: any[]; // Using any for the API response as we'll map it to our interface
  nextPage?: string;
}

// Context analysis type - updated to match the new output format
export interface ArticleContext {
  summary: string;
  whyItMatters: string;
  timeline: { date: string; event: string }[];
  stakeholders: { name: string; stake: string }[];
  perspectives: string;
  patterns: string;
  changePoints: string;
}

// Map NewsData.io response to our NewsArticle interface
function mapNewsDataToArticle(item: any): NewsArticle {
  console.log("API: Mapping news item:", item.title);
  
  return {
    title: item.title || "Untitled",
    description: item.description || "",
    source: item.source_id || "",
    url: item.link || "",
    image_url: item.image_url || undefined,
    published_at: item.pubDate || new Date().toISOString(),
    content: item.content || item.description || "",
    category: item.category || [],
    id: item.article_id || `news-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  };
}

// Fetch news from NewsData.io API
export async function fetchTopHeadlines(country = 'in'): Promise<NewsArticle[]> {
  try {
    console.log("API: fetchTopHeadlines called for country:", country);
    
    const endpoint = `${NEWS_API_BASE_URL}/news`;
    const params = new URLSearchParams({
      apikey: NEWS_API_KEY,
      country: country,
      language: 'en'
    });
    
    console.log(`API: Calling NewsData.io endpoint: ${endpoint}?${params.toString()}`);
    
    const response = await fetch(`${endpoint}?${params.toString()}`);
    
    if (!response.ok) {
      console.error("API: NewsData.io API error:", response.status, response.statusText);
      throw new Error(`NewsData.io API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("API: NewsData.io response status:", data.status);
    console.log("API: Total results:", data.totalResults);
    
    if (data.status !== "success" || !data.results) {
      console.error("API: Unexpected response format:", data);
      throw new Error("Unexpected response format from NewsData.io API");
    }
    
    const articles = data.results.map(mapNewsDataToArticle);
    console.log("API: Processed articles:", articles.length);
    
    return articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    console.log("API: Returning empty array due to error");
    return [];
  }
}

export async function searchNews(query: string, country = 'in'): Promise<NewsArticle[]> {
  try {
    console.log("===== SEARCH API DEBUG =====");
    console.log("API: Searching news with query:", query);
    console.log("API: Search country parameter:", country);
    
    if (!query || query.trim() === '') {
      console.log("API: Empty search query received");
      console.log("========================");
      return [];
    }
    
    const trimmedQuery = query.trim();
    console.log("API: Trimmed query:", trimmedQuery);
    
    const endpoint = `${NEWS_API_BASE_URL}/news`;
    const params = new URLSearchParams({
      apikey: NEWS_API_KEY,
      q: trimmedQuery,
      country: country,
      language: 'en'
    });
    
    console.log(`API: Calling NewsData.io search endpoint: ${endpoint}?${params.toString()}`);
    
    const response = await fetch(`${endpoint}?${params.toString()}`);
    
    if (!response.ok) {
      console.error("API: NewsData.io search API error:", response.status, response.statusText);
      throw new Error(`NewsData.io API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("API: NewsData.io search response status:", data.status);
    console.log("API: Search total results:", data.totalResults || 0);
    
    if (data.status !== "success") {
      console.error("API: Unexpected search response format:", data);
      throw new Error("Unexpected response format from NewsData.io search API");
    }
    
    if (!data.results || data.results.length === 0) {
      console.log("API: No search results found for query:", trimmedQuery);
      console.log("========================");
      return [];
    }
    
    const searchResults = data.results.map(mapNewsDataToArticle);
    console.log("API: Processed search results:", searchResults.length);
    console.log("API: First search result title:", searchResults[0]?.title);
    console.log("========================");
    
    return searchResults;
  } catch (error) {
    console.error('Error searching news:', error);
    // Return empty array instead of throwing to avoid breaking the UI
    console.log("API: Returning empty array due to error");
    console.log("========================");
    return [];
  }
}

export async function generateArticleContext(article: NewsArticle): Promise<ArticleContext> {
  try {
    // Prepare the content for OpenAI
    const content = `
      Title: ${article.title}
      Description: ${article.description}
      Source: ${article.source}
      Published: ${article.published_at}
      ${article.content ? `Content: ${article.content}` : ''}
      ${article.category ? `Categories: ${article.category.join(', ')}` : ''}
    `;

    console.log("Generating context for article:", article.title);
    
    try {
      // Use a faster model and set a reasonable timeout
      const startTime = Date.now();
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Using a faster model
        messages: [
          {
            role: "system",
            content: `You are a systems thinker and a journalist.

Given a news headline or short summary, break it down into a clear, structured explanation that helps a regular person understand the full context.

Avoid jargon. Instead of using systems thinking terms like "leverage points," explain them in everyday language — e.g., "places where small changes could make a big difference".

Structure your analysis using exactly these headings and emoji:

🧵 Summary
🔥 Why This Matters
📜 How We Got Here (Timeline)
💸 Who Benefits or Loses
🔍 Different Perspectives
🔁 Patterns + Loops
🛠️ Where Change Can Happen

Respond in JSON format with these exact fields:
{
  "summary": "A clear and short explanation of the story.",
  "whyItMatters": "What's at stake? Why should people care about this?",
  "timeline": [
    {"date": "Year or period", "event": "Description of key event"}
  ],
  "stakeholders": [
    {"name": "Group or person name", "stake": "How they're affected"}
  ],
  "perspectives": "What are opposing views, and why do people see this differently?",
  "patterns": "Describe any repeating cycles that keep the situation going.",
  "changePoints": "1-3 places where small shifts could make meaningful impact."
}

Keep your response concise but informative.`
          },
          {
            role: "user",
            content: `Analyze this news article: ${content}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: "json_object" } // Force JSON response
      });
      
      const processingTime = Date.now() - startTime;
      console.log(`OpenAI response received in ${processingTime}ms`);
      
      // Parse the response
      try {
        const responseText = completion.choices[0].message.content || "";
        let contextData: ArticleContext;
        
        try {
          contextData = JSON.parse(responseText);
          console.log("Successfully parsed OpenAI response as JSON");
        } catch (parseError) {
          console.error("Failed to parse OpenAI response:", parseError);
          throw new Error("Could not parse context data");
        }
        
        // Validate the structure matches our interface
        if (!contextData.summary || !contextData.whyItMatters || 
            !contextData.timeline || !contextData.stakeholders ||
            !contextData.perspectives || !contextData.patterns ||
            !contextData.changePoints) {
          console.error("Invalid context data structure:", contextData);
          throw new Error("Incomplete context data from OpenAI");
        }
        
        return contextData;
      } catch (parseError) {
        console.error("Failed to process OpenAI response:", parseError);
        throw new Error("Could not process context data");
      }
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError);
      // Fallback to mock data
      return generateMockContext(article);
    }
  } catch (error) {
    console.error('Error generating article context:', error);
    return generateMockContext(article);
  }
}

// Generate mock context if OpenAI call fails
function generateMockContext(article: NewsArticle): ArticleContext {
  console.log("Using mock context for:", article.title);
  
  // Mock context generation based on article title and content
  const mockContext: ArticleContext = {
    summary: `This is a summary of the article about ${article.title}. The article discusses key developments in this area and their potential implications.`,
    
    whyItMatters: `This story matters because it affects millions of people, impacts economic stability, and could influence future policy decisions in this domain.`,
    
    timeline: [
      { date: "2024", event: "Initial developments related to this topic" },
      { date: "Early 2025", event: "Key milestone that preceded this news" },
      { date: "May 2025", event: "The current event as reported in the article" }
    ],
    
    stakeholders: [
      { name: "Government Agencies", stake: "Responsible for regulation and oversight in this area" },
      { name: "Industry Leaders", stake: "Financial interests and market position affected by these developments" },
      { name: "General Public", stake: "Daily life and future opportunities impacted by these changes" }
    ],
    
    perspectives: `Some see this as a positive development that will drive innovation and growth, while others are concerned about potential negative consequences for certain communities or long-term sustainability.`,
    
    patterns: `This situation follows a familiar pattern where initial policy changes lead to market adaptations, which then trigger further regulatory responses, creating a cycle of adjustment and readjustment.`,
    
    changePoints: `Three areas where meaningful change could happen: 1) More inclusive stakeholder participation in decision-making; 2) Better data collection and transparency about impacts; 3) Alignment of short-term incentives with long-term goals.`
  };

  // Customize the mock response based on article content
  if (article.category?.includes('technology')) {
    mockContext.stakeholders.push({ name: "Tech Companies", stake: "Driving innovation while managing competitive pressures" });
  } else if (article.category?.includes('politics')) {
    mockContext.stakeholders.push({ name: "Political Parties", stake: "Competing visions for policy direction and public support" });
  }

  return mockContext;
}

// Detect user's country based on IP (mock implementation)
export function detectUserCountry(): Promise<string> {
  return Promise.resolve('in'); // Default to India for demo
}
