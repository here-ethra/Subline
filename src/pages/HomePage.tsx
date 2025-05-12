
import { useState, useEffect } from 'react';
import { useAccount, useEnsName } from 'wagmi';
import NewsCard from '@/components/NewsCard';
import Header from '@/components/Header';
import { fetchTopHeadlines, detectUserCountry, NewsArticle } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const HomePage = () => {
  const [headlines, setHeadlines] = useState<NewsArticle[]>([]);
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { toast } = useToast();
  
  useEffect(() => {
    const loadHeadlines = async () => {
      setLoading(true);
      try {
        const detectedCountry = await detectUserCountry();
        setCountry(detectedCountry);
        const news = await fetchTopHeadlines(detectedCountry);
        setHeadlines(news);
      } catch (error) {
        console.error('Failed to load headlines:', error);
        toast({
          title: 'Error',
          description: 'Failed to load headlines. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadHeadlines();
  }, [toast]);
  
  const handleSearch = (query: string) => {
    // Redirect to search page handled by Header component
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Top Headlines
            {country && <span className="text-sm font-normal text-gray-500 ml-2">({country.toUpperCase()})</span>}
          </h1>
          <div className="text-sm text-gray-400">
            {ensName || address?.substring(0, 6) + '...' + address?.substring(address.length - 4)}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
            {headlines.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
            {headlines.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400">No headlines available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
