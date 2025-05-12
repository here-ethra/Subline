
import OpenAI from "openai";

// Replace with actual API keys in production
const NEWS_API_KEY = "YOUR_NEWS_API_KEY"; 

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

// Context analysis type
export interface ArticleContext {
  summary: string;
  timeline: { date: string; event: string }[];
  stakeholders: { name: string; role: string }[];
  background: string;
  systemsPerspective: string;
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

    // In production, replace this with actual API call:
    // const response = await fetch(
    //   `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=${country}&language=en`,
    //   { headers: { 'Accept': 'application/json' } }
    // );
    // if (!response.ok) throw new Error('Failed to fetch news');
    // const data = await response.json();
    // return data.results;

    return mockResponse.results;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function searchNews(query: string, country = 'in'): Promise<NewsArticle[]> {
  try {
    // Mock search results based on query
    // In production, replace with actual API call
    const mockResults: NewsArticle[] = [
      {
        title: `Search results for "${query}" - Top story`,
        description: `This is a sample search result for "${query}", showing how the search functionality would work.`,
        source: "Search News",
        url: "https://example.com/search",
        image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        published_at: "2025-05-10T09:45:00Z",
        id: "search-1"
      },
      {
        title: `More about "${query}" - Related news`,
        description: `Additional information related to "${query}" from various sources compiled for your convenience.`,
        source: "Topic Analysis",
        url: "https://example.com/topic-analysis",
        image_url: "https://images.unsplash.com/photo-1569060368216-3b9ee6d1a5d2",
        published_at: "2025-05-09T14:20:00Z",
        id: "search-2"
      }
    ];

    return mockResults;
  } catch (error) {
    console.error('Error searching news:', error);
    return [];
  }
}

export async function generateArticleContext(article: NewsArticle): Promise<ArticleContext> {
  try {
    // In production, this would call an AI service like OpenAI
    // For demo purposes, generating mock context
    
    // Mock context generation based on article title and content
    const mockContext: ArticleContext = {
      summary: `This is an AI-generated summary of the article about ${article.title}. The article discusses key developments in this area and their potential implications.`,
      
      timeline: [
        { date: "January 2025", event: "Initial developments related to this topic" },
        { date: "March 2025", event: "Key milestone that preceded this news" },
        { date: "May 2025", event: "The current event as reported in the article" }
      ],
      
      stakeholders: [
        { name: "Government Agencies", role: "Regulatory oversight and policy implementation" },
        { name: "Industry Leaders", role: "Market participants affected by these developments" },
        { name: "General Public", role: "End users or beneficiaries of the reported changes" }
      ],
      
      background: `This is background information that explains the historical context and important factors leading up to the current news. It provides readers with essential knowledge to understand why this news matters.`,
      
      systemsPerspective: `From a systems thinking perspective, this news represents an important shift in how various elements interact. There are several feedback loops at play, including how regulatory changes affect market behavior, which in turn influences future policy decisions. The root causes of these developments can be traced to economic pressures, technological advancements, and shifting social priorities.`
    };

    // Customize the mock response based on article content
    if (article.category?.includes('technology')) {
      mockContext.stakeholders.push({ name: "Tech Companies", role: "Primary innovators and implementers" });
    } else if (article.category?.includes('politics')) {
      mockContext.stakeholders.push({ name: "Political Parties", role: "Policy advocates and decision makers" });
    }

    return mockContext;
  } catch (error) {
    console.error('Error generating article context:', error);
    return {
      summary: "Unable to generate context at this time.",
      timeline: [],
      stakeholders: [],
      background: "Context information unavailable.",
      systemsPerspective: "Systems perspective analysis unavailable."
    };
  }
}

// Detect user's country based on IP (mock implementation)
export function detectUserCountry(): Promise<string> {
  return Promise.resolve('in'); // Default to India for demo
  
  // In production:
  // return fetch('https://ipapi.co/json/')
  //   .then(response => response.json())
  //   .then(data => data.country_code.toLowerCase())
  //   .catch(() => 'in'); // Default to India if detection fails
}
