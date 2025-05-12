
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

const Header = ({ onSearch, showSearch = true }: HeaderProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Header search triggered with query:", query);
    
    if (query.trim()) {
      if (onSearch) {
        console.log("Using provided onSearch handler");
        onSearch(query);
      } else {
        console.log("Navigating to search page");
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    } else {
      console.log("Empty query, search not performed");
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-context-darkBlue/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => navigate('/')}
            className="text-xl font-bold text-context-blue"
          >
            Context
          </button>
        </div>
        
        <div className="flex-1 max-w-md mx-4">
          {showSearch && (
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news..."
                className="w-full py-1.5 pl-3 pr-10 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-context-blue"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-context-blue"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </form>
          )}
        </div>

        <div className="flex items-center">
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </header>
  );
};

export default Header;
