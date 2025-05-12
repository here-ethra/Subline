
import { useAccount } from 'wagmi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WalletRequiredProps {
  children: React.ReactNode;
}

const WalletRequired = ({ children }: WalletRequiredProps) => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Add debug logs to track the connection status and current path
    console.log("WalletRequired: Connection status:", isConnected);
    console.log("WalletRequired: Current path:", location.pathname);
    console.log("WalletRequired: Current search:", location.search);
    
    // Allow search page to work even when not connected
    const isSearchPage = location.pathname === '/search' && location.search.includes('q=');
    
    // Check if the user is not on the welcome page and is not connected
    if (!isConnected && location.pathname !== '/welcome' && !isSearchPage) {
      console.log("WalletRequired: Redirecting to welcome page");
      // Preserve the current URL as a return destination
      navigate('/welcome');
    }
  }, [isConnected, navigate, location]);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          <h1 className="text-3xl font-bold text-context-blue">Welcome to Context</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Please connect your wallet to continue
          </p>
          <div className="flex justify-center pt-4">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default WalletRequired;
