
import { useState, useEffect } from 'react';
import { useAccount, useEnsName } from 'wagmi';
import NewsCard from '@/components/NewsCard';
import Header from '@/components/Header';
import { fetchTopHeadlines, detectUserCountry, NewsArticle } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useSmartAccount } from '@/hooks/useSmartAccount';

const HomePage = () => {
  const [headlines, setHeadlines] = useState<NewsArticle[]>([]);
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { smartAccountAddress } = useSmartAccount();
  
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
    if (query.trim()) {
      console.log("HomePage: Search requested for:", query);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
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
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/tip')}
              className="flex items-center border-[#85FF00]/30 hover:border-[#85FF00] text-[#85FF00] hover:bg-[#85FF00]/10"
            >
              <Send size={14} className="mr-2" />
              Try Gasless Tipping
            </Button>
            <div className="text-sm text-gray-400">
              {ensName || address?.substring(0, 6) + '...' + address?.substring(address.length - 4)}
            </div>
          </div>
        </div>
        
        {smartAccountAddress && (
          <div className="mb-6 p-4 border border-[#85FF00]/20 bg-[#85FF00]/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#85FF00]">Smart Account Ready!</h2>
                <p className="text-sm text-gray-400">
                  Your smart account is ready for gasless transactions
                </p>
              </div>
              <Button
                onClick={() => navigate('/tip')}
                size="sm"
                className="bg-[#85FF00] text-black hover:bg-[#85FF00]/80"
              >
                Send Tip
              </Button>
            </div>
          </div>
        )}
        
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
