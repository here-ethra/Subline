
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
    console.log("===== WALLET CHECK DEBUG =====");
    console.log("WalletRequired: Connection status:", isConnected);
    console.log("WalletRequired: Current path:", location.pathname);
    console.log("WalletRequired: Current search:", location.search);
    
    // Since we now want to require authentication for all routes, we'll simplify this
    if (!isConnected && location.pathname !== '/welcome') {
      console.log("WalletRequired: User not connected and not on welcome page");
      console.log("WalletRequired: Redirecting to welcome page");
      navigate('/welcome');
    } else {
      console.log("WalletRequired: User is connected or on welcome page, allowing access");
    }
    console.log("========================");
  }, [isConnected, navigate, location]);

  if (!isConnected) {
    console.log("WalletRequired: Rendering connection interface");
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

  console.log("WalletRequired: User is connected, rendering children");
  return <>{children}</>;
};

export default WalletRequired;
