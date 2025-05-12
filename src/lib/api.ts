import OpenAI from "openai";

// News API configuration
const NEWS_API_KEY = "pub_86219f1b7c2997d6c78e114577f2a543229b5";
const OPENAI_API_KEY = "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";

// NewsData.io API base URL
const NEWS_API_BASE_URL = "https://newsdata.io/api/1";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, API calls should be made from a backend
});

// Important topics to include
const IMPORTANT_CATEGORIES = ['top', 'world', 'politics', 'business', 'technology', 'science', 'health', 'environment'];
const IMPORTANT_KEYWORDS = ['crypto', 'blockchain', 'safety', 'disaster', 'breakthrough', 'innovation', 'crisis', 'emergency'];

// Categories to exclude
const EXCLUDED_CATEGORIES = ['entertainment', 'sports', 'lifestyle', 'food', 'travel'];

// Violence-related terms to filter out individual violence stories
const VIOLENCE_KEYWORDS = ['murder', 'stabbing', 'shooting', 'killed', 'assault', 'homicide', 'robbery'];

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

// Change point interface for consistent typing
export interface ChangePoint {
  area: string;
  explanation: string;
}

// Enhanced context analysis interface to include more comprehensive information
export interface ArticleContext {
  summary: string;
  whyItMatters: string;
  timeline: { date: string; event: string }[];
  stakeholders: { name: string; stake: string }[];
  perspectives: {
    mainStakeholders: string;
    experts: string;
    publicOpinion: string;
    critics: string;
  };
  globalContext: {
    similarCase: string;
    resolution: string;
    lessons: string;
  };
  patterns: string;
  changePoints: ChangePoint[] | string; // Updated to handle both string and array formats
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

// Check if an article is important based on our criteria
function isImportantArticle(article: any): boolean {
  // Check categories
  if (article.category) {
    // Exclude entertainment-related categories
    if (article.category.some((cat: string) => 
      EXCLUDED_CATEGORIES.some(excluded => 
        cat.toLowerCase().includes(excluded.toLowerCase())
      )
    )) {
      return false;
    }
    
    // Include if it matches our important categories
    if (article.category.some((cat: string) => 
      IMPORTANT_CATEGORIES.some(important => 
        cat.toLowerCase().includes(important.toLowerCase())
      )
    )) {
      return true;
    }
  }
  
  // Check keywords in title or description
  const textToCheck = `${article.title || ""} ${article.description || ""}`.toLowerCase();
  
  // Filter out individual violence stories
  if (VIOLENCE_KEYWORDS.some(keyword => textToCheck.includes(keyword.toLowerCase()))) {
    // Only exclude if it seems like an isolated incident (not systemic/widespread)
    if (!textToCheck.includes('policy') && 
        !textToCheck.includes('government') && 
        !textToCheck.includes('nationwide') && 
        !textToCheck.includes('systemic') && 
        !textToCheck.includes('crisis')) {
      return false;
    }
  }
  
  // Check for important keywords
  if (IMPORTANT_KEYWORDS.some(keyword => textToCheck.includes(keyword.toLowerCase()))) {
    return true;
  }
  
  return false;
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
    
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: {
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API: NewsData.io API error:", response.status, response.statusText, errorText);
      throw new Error(`NewsData.io API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("API: NewsData.io response status:", data.status);
    console.log("API: Total results:", data.totalResults || 0);
    
    if (data.status !== "success" || !data.results) {
      console.error("API: Unexpected response format:", data);
      throw new Error("Unexpected response format from NewsData.io API");
    }
    
    // Filter to important articles only
    const importantArticles = data.results.filter(isImportantArticle);
    console.log("API: Important articles found:", importantArticles.length, "out of", data.results.length);
    
    const articles = importantArticles.map(mapNewsDataToArticle);
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
    
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: {
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API: NewsData.io search API error:", response.status, response.statusText, errorText);
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
    
    // Filter to important articles for search results as well
    const importantArticles = data.results.filter(isImportantArticle);
    console.log("API: Important search results found:", importantArticles.length, "out of", data.results.length);
    
    const searchResults = importantArticles.map(mapNewsDataToArticle);
    console.log("API: Processed search results:", searchResults.length);
    console.log("API: First search result title:", searchResults[0]?.title);
    console.log("========================");
    
    return searchResults;
  } catch (error) {
    console.error('Error searching news:', error);
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

Given a news headline or article, break it down into a clear, structured explanation that helps a regular person understand the full context.

Avoid jargon. Instead of using systems thinking terms like "leverage points," explain them in everyday language — e.g., "places where small changes could make a big difference".

Structure your analysis with enhanced depth, providing balanced perspectives from all stakeholders:

Respond in JSON format with these exact fields:
{
  "summary": "A clear and concise explanation of the story",
  "whyItMatters": "A detailed explanation of why people should care about this and who is affected",
  "timeline": [
    {"date": "Year or specific period", "event": "Detailed description of key event with context"}
  ],
  "stakeholders": [
    {"name": "Group or person name", "stake": "Detailed explanation of how they're affected or their role in the situation"}
  ],
  "perspectives": {
    "mainStakeholders": "Detailed views of the primary parties involved",
    "experts": "Analysis from specialists and academics in this field",
    "publicOpinion": "How the general public views this issue",
    "critics": "Opposing viewpoints with their main arguments"
  },
  "globalContext": {
    "similarCase": "An example of a similar situation from around the world",
    "resolution": "How that case was handled or resolved",
    "lessons": "What can be learned from comparing these situations"
  },
  "patterns": "An analysis of recurring patterns or cycles in this situation",
  "changePoints": [
    {"area": "Specific area where change can happen", "explanation": "Brief explanation of why this is important"}
  ]
}

Make sure changePoints is an array of objects with 'area' and 'explanation' fields.
Keep your response structured but comprehensive.`
          },
          {
            role: "user",
            content: `Analyze this news article: ${content}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" } // Force JSON response
      });
      
      const processingTime = Date.now() - startTime;
      console.log(`OpenAI response received in ${processingTime}ms`);
      
      // Parse the response
      try {
        const responseText = completion.choices[0].message.content || "";
        let contextData: ArticleContext;
        
        try {
          const parsedResponse = JSON.parse(responseText);
          
          // Ensure the response matches our enhanced interface
          contextData = {
            summary: parsedResponse.summary,
            whyItMatters: parsedResponse.whyItMatters,
            timeline: parsedResponse.timeline || [],
            stakeholders: parsedResponse.stakeholders || [],
            perspectives: {
              mainStakeholders: parsedResponse.perspectives?.mainStakeholders || "",
              experts: parsedResponse.perspectives?.experts || "",
              publicOpinion: parsedResponse.perspectives?.publicOpinion || "",
              critics: parsedResponse.perspectives?.critics || ""
            },
            globalContext: {
              similarCase: parsedResponse.globalContext?.similarCase || "",
              resolution: parsedResponse.globalContext?.resolution || "",
              lessons: parsedResponse.globalContext?.lessons || ""
            },
            patterns: parsedResponse.patterns || "",
            changePoints: parsedResponse.changePoints || []
          };
          
          console.log("Successfully parsed OpenAI response as JSON");
        } catch (parseError) {
          console.error("Failed to parse OpenAI response:", parseError);
          throw new Error("Could not parse context data");
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
      { name: "General Public", stake: "Daily life and future opportunities impacted by these changes" },
      { name: "Vulnerable Communities", stake: "Disproportionately affected by these changes with fewer resources to adapt" }
    ],
    
    perspectives: {
      mainStakeholders: "Primary stakeholders have conflicting views about these developments. Some see opportunities for growth while others express concerns about implementation challenges.",
      experts: "Policy experts and researchers emphasize the need for evidence-based approaches and point to historical precedents that might inform current decisions.",
      publicOpinion: "Public sentiment is divided, with polls showing approximately 45% in favor, 35% opposed, and 20% undecided about the developments described in this article.",
      critics: "Critics argue that the approach fails to address underlying systemic issues and may exacerbate existing inequalities without proper safeguards."
    },
    
    globalContext: {
      similarCase: "In 2023, a similar situation emerged in South Korea, where authorities implemented comparable measures to address related challenges.",
      resolution: "The South Korean approach included stronger regulatory oversight and public-private partnerships, which ultimately resulted in a more stable outcome.",
      lessons: "Key lessons include the importance of transparent communication, inclusive stakeholder engagement, and adaptive management frameworks that can evolve as new information emerges."
    },
    
    patterns: `This situation follows a familiar pattern where initial policy changes lead to market adaptations, which then trigger further regulatory responses, creating a cycle of adjustment and readjustment.`,
    
    changePoints: [
      { area: "Stakeholder Engagement", explanation: "More inclusive participation in decision-making processes" },
      { area: "Data Transparency", explanation: "Better data collection and transparency about impacts across different demographic groups" },
      { area: "Incentive Alignment", explanation: "Alignment of short-term incentives with long-term sustainability goals" },
      { area: "Capacity Building", explanation: "Investment in capacity building for implementing organizations" },
      { area: "Independent Review", explanation: "Regular independent reviews of outcomes against stated objectives" }
    ]
  };

  // Customize the mock response based on article content
  if (article.category?.includes('technology')) {
    mockContext.stakeholders.push({ name: "Tech Companies", stake: "Driving innovation while managing competitive pressures and regulatory compliance" });
  } else if (article.category?.includes('politics')) {
    mockContext.stakeholders.push({ name: "Political Parties", stake: "Competing visions for policy direction and public support with electoral implications" });
  }

  return mockContext;
}

// Detect user's country based on IP (mock implementation)
export function detectUserCountry(): Promise<string> {
  return Promise.resolve('in'); // Default to India for demo
}
