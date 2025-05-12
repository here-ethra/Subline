
import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Search, Moon, Sun } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAccount } from 'wagmi';
import { useTheme } from 'next-themes';

interface HeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

const Header = ({ onSearch, showSearch = true }: HeaderProps) => {
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected } = useAccount();
  const { theme, setTheme } = useTheme();
  
  // After mounted, we can show the theme toggle (to avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);
  
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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-30 w-full neo-glass shadow-subline">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <button onClick={() => navigate('/')} className="p-2">
            <img
              src="/subline.png"
              alt="Subline Logo"
              className="h-8 w-auto"
            />
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
                className="w-full py-1.5 pl-3 pr-3 rounded-l-full border border-gray-300 dark:border-gray-600 dark:bg-subline-darkCard/70 text-sm focus:outline-none focus:ring-1 focus:ring-subline-indigo shadow-subline-inset"
              />
              <Button 
                type="submit" 
                size="sm"
                className="rounded-l-none rounded-r-full bg-gradient-indigo-coral hover:opacity-90 shadow-sm"
                aria-label="Search"
              >
                <Search size={16} className="mr-1" />
                Search
              </Button>
            </form>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          )}
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </header>
  );
};

export default Header;
