import OpenAI from "openai";

// Replace with actual API keys in production
const NEWS_API_KEY = "YOUR_NEWS_API_KEY"; 
const OPENAI_API_KEY = "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";

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
  results: NewsArticle[];
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

// Fetch news from NewsData.io API
export async function fetchTopHeadlines(country = 'in'): Promise<NewsArticle[]> {
  try {
    // For demo purposes, using a mock response
    const mockResponse: NewsResponse = {
      status: "success",
      totalResults: 5,
      results: [
        {
          title: "India's Tech Industry Sees Record Growth in 2025",
          description: "The Indian technology sector reported unprecedented growth this quarter, with investments crossing $10 billion.",
          source: "Tech Times India",
          url: "https://example.com/tech-growth",
          image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
          published_at: "2025-05-10T09:45:00Z",
          content: "The Indian technology sector has seen tremendous growth...",
          category: ["technology", "business"],
          id: "1"
        },
        {
          title: "Global Climate Summit Concludes with New Agreements",
          description: "World leaders reached a consensus on limiting carbon emissions at the latest climate summit.",
          source: "Environment News",
          url: "https://example.com/climate-summit",
          image_url: "https://images.unsplash.com/photo-1569060368216-3b9ee6d1a5d2",
          published_at: "2025-05-09T14:20:00Z",
          category: ["environment", "politics"],
          id: "2"
        },
        {
          title: "Cryptocurrency Regulations Set to Change in Asian Markets",
          description: "New regulatory frameworks for cryptocurrencies will be implemented across Asian markets starting next month.",
          source: "Crypto News Asia",
          url: "https://example.com/crypto-regulations",
          image_url: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247",
          published_at: "2025-05-08T11:30:00Z",
          category: ["finance", "technology"],
          id: "3"
        },
        {
          title: "Healthcare Innovation Prize Awarded to Indian Startup",
          description: "A Bangalore-based healthcare startup received global recognition for its AI diagnostic tool.",
          source: "Health Tech Today",
          url: "https://example.com/healthcare-innovation",
          image_url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
          published_at: "2025-05-07T16:15:00Z",
          category: ["health", "technology"],
          id: "4"
        },
        {
          title: "Major Infrastructure Project Announced for Rural Development",
          description: "The government has approved a $5 billion infrastructure project focused on rural connectivity and development.",
          source: "National Development News",
          url: "https://example.com/infrastructure-project",
          image_url: "https://images.unsplash.com/photo-1520525003249-2b9cdda513bc",
          published_at: "2025-05-06T08:00:00Z",
          category: ["politics", "infrastructure"],
          id: "5"
        }
      ]
    };

    return mockResponse.results;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function searchNews(query: string, country = 'in'): Promise<NewsArticle[]> {
  try {
    console.log("API: Searching news with query:", query);
    
    if (!query || query.trim() === '') {
      console.log("API: Empty search query received");
      return [];
    }
    
    const trimmedQuery = query.trim();
    console.log("API: Trimmed query:", trimmedQuery);
    
    // Enhanced logging for search process
    console.log("API: Generating search results for:", trimmedQuery);
    
    // Mock search results based on query
    const mockResults: NewsArticle[] = [
      {
        title: `${trimmedQuery} - Latest Developments`,
        description: `Recent developments related to "${trimmedQuery}" show significant impact across multiple sectors.`,
        source: "Search News",
        url: "https://example.com/search",
        image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        published_at: "2025-05-10T09:45:00Z",
        id: `search-${Date.now()}-1`
      },
      {
        title: `${trimmedQuery} - Analysis and Insights`,
        description: `Experts provide analysis on how "${trimmedQuery}" is influencing market trends and future prospects.`,
        source: "Topic Analysis",
        url: "https://example.com/topic-analysis",
        image_url: "https://images.unsplash.com/photo-1569060368216-3b9ee6d1a5d2",
        published_at: "2025-05-09T14:20:00Z",
        id: `search-${Date.now()}-2`
      },
      {
        title: `The Impact of ${trimmedQuery} on Global Markets`,
        description: `How "${trimmedQuery}" is reshaping global markets and creating new opportunities for businesses.`,
        source: "Global Trends",
        url: "https://example.com/global-trends",
        image_url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
        published_at: "2025-05-08T11:30:00Z",
        id: `search-${Date.now()}-3`
      }
    ];
    
    console.log("API: Generated mock search results:", mockResults.length);
    return mockResults;
  } catch (error) {
    console.error('Error searching news:', error);
    // Return empty array instead of throwing to avoid breaking the UI
    console.log("API: Returning empty array due to error");
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
