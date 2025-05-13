
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { NewsArticle, generateArticleContext, ArticleContext } from '@/lib/api';
import Header from '@/components/Header';
import ContextSection from '@/components/ContextSection';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ExternalLink, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const ArticlePage = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get article from location state or mock it if not available
  const [article, setArticle] = useState<NewsArticle | null>(
    location.state?.article || null
  );
  
  const [context, setContext] = useState<ArticleContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // If we don't have the article in the state, we would normally fetch it
    // For demo purposes, creating a mock article if not provided
    if (!article && id) {
      const mockArticle: NewsArticle = {
        id,
        title: "Article not found in state, this is a fallback",
        description: "This is a fallback description. Normally, we would fetch this article using its ID.",
        source: "Subline",
        url: "https://example.com",
        published_at: new Date().toISOString(),
      };
      setArticle(mockArticle);
    }
  }, [article, id]);
  
  useEffect(() => {
    if (!article) return;
    
    const loadContext = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const articleContext = await generateArticleContext(article);
        setContext(articleContext);
      } catch (error) {
        console.error('Failed to generate context:', error);
        setError('Failed to generate context for this article.');
        toast({
          title: 'Error',
          description: 'Failed to generate context for this article.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadContext();
  }, [article, toast]);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-black">
        <Header showSearch={false} />
        <div className="container mx-auto px-4 py-10 text-center">
          <p>Article not found</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }
  
  const formattedDate = article.published_at ? 
    formatDistanceToNow(new Date(article.published_at), { addSuffix: true }) : 
    'Recently';
    
  return (
    <div className="min-h-screen bg-black">
      <Header showSearch={false} />
      
      <main className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 hover:text-[#7aff62]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-1" /> Back
        </Button>
        
        <article className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{article.title}</h1>
          
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <span>{article.source}</span>
            <span>{formattedDate}</span>
          </div>

          {article.category && article.category.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.category.map((cat, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-1 text-xs rounded bg-black border border-[#7aff62]/30 text-[#7aff62]"
                >
                  <Tag size={12} className="mr-1" />
                  {cat}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-lg mb-6">{article.description}</p>
          
          {article.content && (
            <div className="prose dark:prose-invert max-w-none mb-6">
              <p>{article.content}</p>
            </div>
          )}
          
          <div className="flex justify-center my-8">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center hover:text-[#7aff62] hover:border-[#7aff62]/50"
              onClick={() => window.open(article.url, '_blank')}
            >
              Read original article <ExternalLink size={14} className="ml-2" />
            </Button>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <h2 className="text-2xl font-bold mb-6">Context</h2>
            
            {loading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-6 w-32 mb-3 bg-gray-800" />
                    <Skeleton className="h-24 w-full rounded-md bg-gray-800" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <p className="text-center text-gray-500 py-10">
                {error}
              </p>
            ) : context ? (
              <ContextSection context={context} />
            ) : (
              <p className="text-center text-gray-500 py-10">
                Unable to generate context for this article.
              </p>
            )}
          </div>
        </article>
      </main>
    </div>
  );
};

export default ArticlePage;
