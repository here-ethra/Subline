
import { NewsArticle } from '@/lib/api';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard = ({ article }: NewsCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/article/${article.id}`, { state: { article } });
  };
  
  const formattedDate = article.published_at ? 
    formatDistanceToNow(new Date(article.published_at), { addSuffix: true }) : 
    'Recently';

  return (
    <Card 
      className="subline-card group cursor-pointer overflow-hidden border border-gray-800/30 dark:border-gray-700/30 bg-white/90 dark:bg-subline-darkCard/90 backdrop-blur-sm animate-in fade-in"
      onClick={handleClick}
    >
      {article.image_url && (
        <div className="relative w-full h-52 overflow-hidden">
          <img 
            src={article.image_url} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
        </div>
      )}
      <CardHeader className="p-4 pb-2">
        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-gradient transition-all duration-300">{article.title}</h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between mt-1">
          <span className="font-medium">{article.source}</span>
          <span>{formattedDate}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mt-1">{article.description}</p>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
