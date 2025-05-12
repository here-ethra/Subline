
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAccount } from 'wagmi';

interface HeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

const Header = ({ onSearch, showSearch = true }: HeaderProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected } = useAccount();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("===== SEARCH DEBUG =====");
    console.log("Header: Search form submitted");
    console.log("Header: Current query:", query);
    console.log("Header: Wallet connected:", isConnected);
    console.log("Header: Current location:", location.pathname);
    
    if (query.trim()) {
      console.log("Header: Valid search query detected");
      if (onSearch) {
        console.log("Header: Using provided onSearch handler");
        onSearch(query);
      } else {
        console.log("Header: Navigating to search page with query:", query);
        const trimmedQuery = query.trim();
        const searchPath = `/search?q=${encodeURIComponent(trimmedQuery)}`;
        console.log("Header: Constructed search path:", searchPath);
        
        // Check if we're already on the search page
        if (location.pathname === '/search') {
          console.log("Header: Already on search page, using replace to update query");
          // Use replace to avoid adding to history stack
          navigate(searchPath, { replace: true });
        } else {
          console.log("Header: Navigating to search page");
          navigate(searchPath);
        }
        
        // Log after navigation attempt to verify it was called
        console.log("Header: Navigation function called");
      }
    } else {
      console.log("Header: Empty query, search not performed");
    }
    console.log("========================");
  };

  const handleButtonClick = () => {
    console.log("Header: Search button clicked directly");
    // The form submission will handle the actual search
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
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news..."
                className="w-full py-1.5 pl-3 pr-3 rounded-l-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-context-blue"
              />
              <Button 
                type="submit" 
                size="sm"
                className="rounded-l-none rounded-r-full"
                onClick={handleButtonClick}
                aria-label="Search"
              >
                <Search size={16} className="mr-1" />
                Search
              </Button>
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
