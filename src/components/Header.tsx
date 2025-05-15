
import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Search, Wallet } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAccount, useEnsName } from 'wagmi';
import { useSmartAccount } from '@/hooks/useSmartAccount';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

const Header = ({ onSearch, showSearch = true }: HeaderProps) => {
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { smartAccountAddress, isReady } = useSmartAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        const trimmedQuery = query.trim();
        const searchPath = `/search?q=${encodeURIComponent(trimmedQuery)}`;
        if (location.pathname === '/search') {
          navigate(searchPath, { replace: true });
        } else {
          navigate(searchPath);
        }
      }
    }
  };

  // Truncate the wallet address (e.g. 0x12...9fA2)
  const shortenAddress = (addr: string | null | undefined) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-black border-b border-gray-800/50 shadow-md">
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
                className="w-full py-1.5 pl-3 pr-3 rounded-l-full border border-gray-600 bg-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#85FF00] shadow-sm"
              />
              <Button 
                type="submit" 
                size="sm"
                className="rounded-l-none rounded-r-full bg-[#85FF00] text-black hover:bg-[#85FF00]/80 shadow-[0_0_10px_rgba(133,255,0,0.15)] px-3"
                aria-label="Search"
              >
                <Search size={16} className="" />
              </Button>
            </form>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {isConnected && isReady && smartAccountAddress && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2 border-gray-600 bg-gray-900 hover:bg-gray-800 hover:border-[#85FF00] min-w-[0] px-2"
                  >
                    <Wallet size={14} className="mr-1 text-[#85FF00]" />
                    <span className="text-xs font-mono">
                      {shortenAddress(smartAccountAddress)}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Smart Account: {smartAccountAddress}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <div>
            <ConnectButton showBalance={false} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
