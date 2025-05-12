
import { NewsArticle } from '@/lib/api';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'lucide-react';

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
      className="subline-card group cursor-pointer overflow-hidden border border-gray-800 bg-black dark:bg-black hover:border-[#7aff62]/40 transition-all duration-300"
      onClick={handleClick}
    >
      <CardHeader className="p-4 pb-2">
        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-[#7aff62] transition-all duration-300">{article.title}</h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between mt-1">
          <span className="font-medium">{article.source}</span>
          <span>{formattedDate}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mt-1">{article.description}</p>
        {article.category && article.category.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {article.category.map((cat, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-1 text-xs rounded bg-black border border-[#7aff62]/30 text-[#7aff62]"
              >
                <Tag size={10} className="mr-1" />
                {cat}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;
