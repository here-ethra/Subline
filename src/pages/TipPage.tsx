
import Header from '@/components/Header';
import TipForm from '@/components/TipForm';
import { useSmartAccount } from '@/hooks/useSmartAccount';
import { Loader2, Wallet, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TipPage = () => {
  const { smartAccountAddress, isCreating, isReady, error } = useSmartAccount();
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleTipSuccess = (hash: string) => {
    setTxHash(hash);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Gasless Tipping with Smart Accounts</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            <Card className="flex-1 border-gray-800 bg-gray-900/50 p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#85FF00]">Smart Account Status</h2>
              {isCreating ? (
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 animate-spin text-[#85FF00]" />
                  <span>Creating your smart account...</span>
                </div>
              ) : isReady ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Smart Account Ready!</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md">
                    <Wallet className="w-4 h-4 text-[#85FF00]" />
                    <code className="text-sm break-all">{smartAccountAddress}</code>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    This account allows you to send gasless transactions on Base
                  </p>
                </div>
              ) : (
                <div className="text-red-500">
                  {error || "Unable to initialize smart account"}
                </div>
              )}
            </Card>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Send a Gasless Tip</h2>
            <p className="text-gray-400 mb-6">
              Test out gasless transactions by sending a small amount of ETH to any address. 
              No gas fees will be charged to your wallet!
            </p>
            <div className="flex justify-center">
              <TipForm onSuccess={handleTipSuccess} />
            </div>
          </div>
          
          {txHash && (
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-green-400 mb-2">Transaction Successful!</h3>
              <p className="mb-3">Your gasless transaction has been submitted:</p>
              <a 
                href={`https://basescan.org/tx/${txHash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#85FF00] underline break-all"
              >
                {txHash}
              </a>
              <div className="mt-4">
                <Button
                  onClick={() => window.open(`https://basescan.org/tx/${txHash}`, '_blank')}
                  variant="outline"
                  className="border-[#85FF00] text-[#85FF00] hover:bg-[#85FF00]/10"
                >
                  View on Basescan
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TipPage;
