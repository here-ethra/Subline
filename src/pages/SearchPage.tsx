
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import NewsCard from '@/components/NewsCard';
import { searchNews, NewsArticle } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccount } from 'wagmi';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { toast } = useToast();
  const { isConnected } = useAccount();
  
  useEffect(() => {
    console.log("===== SEARCH PAGE DEBUG =====");
    console.log("SearchPage: Component mounted/updated");
    console.log("SearchPage: Current query param:", query);
    console.log("SearchPage: Wallet connected:", isConnected);
    console.log("SearchPage: Search already performed:", searchPerformed);
    
    // Handle empty query with more detailed logging
    if (!query || query.trim() === '') {
      console.log("SearchPage: Empty query detected");
      // Only redirect if no search has been performed yet
      if (!searchPerformed) {
        console.log("SearchPage: No search performed yet, redirect skipped");
        setLoading(false);
        return;
      }
    }
    
    console.log("SearchPage: Performing search for:", query);
    
    const performSearch = async () => {
      setLoading(true);
      try {
        console.log("SearchPage: Calling searchNews API with query:", query);
        
        // Log the API call details before making the request
        console.log("SearchPage: API call details:");
        console.log("- API endpoint: /news");
        console.log("- Search query:", query);
        console.log("- Additional parameters: language=en, country=in");
        
        const searchResults = await searchNews(query);
        
        console.log("SearchPage: Search API call completed");
        console.log("SearchPage: Search results received:", searchResults.length, "articles");
        console.log("SearchPage: Search results data:", JSON.stringify(searchResults).substring(0, 200) + "...");
        
        if (searchResults.length === 0) {
          console.log("SearchPage: No results found for query:", query);
        } else {
          console.log("SearchPage: First result title:", searchResults[0]?.title);
          console.log("SearchPage: First result source:", searchResults[0]?.source);
          console.log("SearchPage: First result URL:", searchResults[0]?.url);
        }
        
        setResults(searchResults);
        setSearchPerformed(true);
      } catch (error) {
        console.error('SearchPage: Search failed:', error);
        console.log("SearchPage: Error type:", typeof error);
        console.log("SearchPage: Error message:", error instanceof Error ? error.message : String(error));
        
        toast({
          title: 'Error',
          description: 'Failed to search for news. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
        console.log("SearchPage: Search completed, loading set to false");
      }
    };
    
    performSearch();
    console.log("========================");
  }, [query, toast, isConnected]);
  
  const handleSearch = (newQuery: string) => {
    console.log("SearchPage: New search handler called with query:", newQuery);
    if (newQuery.trim() === '') {
      console.log("SearchPage: Empty search query, not navigating");
      return;
    }
    navigate(`/search?q=${encodeURIComponent(newQuery.trim())}`);
  };
  
  return (
    <div className="min-h-screen bg-black">
      <Header onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 hover:text-[#004eff]"
          onClick={() => {
            console.log("SearchPage: Back to Headlines button clicked");
            navigate('/');
          }}
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Headlines
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">
          {query ? `Search Results for "${query}"` : 'Search News'}
        </h1>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-800 rounded-lg overflow-hidden bg-black">
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-gray-800/50" />
                  <Skeleton className="h-4 w-1/2 mb-4 bg-gray-800/50" />
                  <Skeleton className="h-16 w-full bg-gray-800/50" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.length > 0 ? (
              results.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400">
                  {query ? `No results found for "${query}"` : 'Enter a search term to find news'}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4 hover:text-[#004eff] hover:border-[#004eff]/50"
                  onClick={() => {
                    console.log("SearchPage: Return to Headlines button clicked");
                    navigate('/');
                  }}
                >
                  Return to Headlines
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
