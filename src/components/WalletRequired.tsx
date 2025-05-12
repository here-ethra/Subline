
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WalletRequiredProps {
  children: React.ReactNode;
}

const WalletRequired = ({ children }: WalletRequiredProps) => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the user is not on the welcome page and is not connected
    if (!isConnected && window.location.pathname !== '/welcome') {
      navigate('/welcome');
    }
  }, [isConnected, navigate]);

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
