
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
  const { toast } = useToast();
  
  useEffect(() => {
    if (!query) {
      console.log("No query found, redirecting to home");
      navigate('/');
      return;
    }
    
    console.log("SearchPage: Searching for:", query);
    
    const performSearch = async () => {
      setLoading(true);
      try {
        console.log("Calling searchNews API with query:", query);
        const searchResults = await searchNews(query);
        console.log("Search results received:", searchResults);
        setResults(searchResults);
      } catch (error) {
        console.error('Search failed:', error);
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
  }, [query, navigate, toast]);
  
  const handleSearch = (newQuery: string) => {
    console.log("Search handler called with query:", newQuery);
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
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
          Search Results for "{query}"
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
                <p className="text-gray-500">No results found for "{query}"</p>
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
