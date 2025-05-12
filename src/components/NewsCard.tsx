
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
      className="hover:shadow-md transition-all cursor-pointer overflow-hidden border border-gray-200"
      onClick={handleClick}
    >
      {article.image_url && (
        <div className="relative w-full h-48 overflow-hidden">
          <img 
            src={article.image_url} 
            alt={article.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3';
            }}
          />
        </div>
      )}
      <CardHeader className="p-4 pb-2">
        <h3 className="text-lg font-semibold line-clamp-2">{article.title}</h3>
        <div className="text-xs text-gray-500 flex justify-between mt-1">
          <span>{article.source}</span>
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
