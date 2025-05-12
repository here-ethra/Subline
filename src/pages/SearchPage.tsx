
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import NewsCard from '@/components/NewsCard';
import { searchNews, NewsArticle } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("SearchPage: Initial render with query:", query);
    
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
        const searchResults = await searchNews(query);
        console.log("SearchPage: Search results received:", searchResults);
        
        if (searchResults.length === 0) {
          console.log("SearchPage: No results found for query:", query);
        }
        
        setResults(searchResults);
        setSearchPerformed(true);
      } catch (error) {
        console.error('SearchPage: Search failed:', error);
        toast({
          title: 'Error',
          description: 'Failed to search for news. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [query, toast]);
  
  const handleSearch = (newQuery: string) => {
    console.log("SearchPage: New search handler called with query:", newQuery);
    if (newQuery.trim() === '') {
      console.log("SearchPage: Empty search query, not navigating");
      return;
    }
    navigate(`/search?q=${encodeURIComponent(newQuery.trim())}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Headlines
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">
          {query ? `Search Results for "${query}"` : 'Search News'}
        </h1>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-16 w-full" />
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
                <p className="text-gray-500">
                  {query ? `No results found for "${query}"` : 'Enter a search term to find news'}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/')}
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
