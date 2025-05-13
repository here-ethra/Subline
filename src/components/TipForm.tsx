
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useSmartAccount } from '@/hooks/useSmartAccount';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { Loader2, Send } from 'lucide-react';

interface TipFormProps {
  recipientAddress?: string;
  onSuccess?: (txHash: string) => void;
}

export default function TipForm({ recipientAddress = '', onSuccess }: TipFormProps) {
  const [address, setAddress] = useState(recipientAddress);
  const [amount, setAmount] = useState('0.0001');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendTip, isReady, smartAccountAddress } = useSmartAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address || !amount) {
      toast.error("Please provide both address and amount");
      return;
    }
    
    try {
      setIsSubmitting(true);
      const txHash = await sendTip(address, amount);
      
      if (txHash && onSuccess) {
        onSuccess(txHash);
      }
    } catch (error) {
      console.error("Error sending tip:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send tip");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-gray-800 bg-gray-900/50">
      <CardHeader>
        <CardTitle className="text-[#85FF00]">Send a Gasless Tip</CardTitle>
        <CardDescription>
          Send ETH without paying for gas using your Smart Account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x... or name.base"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-gray-800 border-gray-700"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              step="0.0001"
              min="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-800 border-gray-700"
              required
            />
          </div>
          
          <div className="space-y-1 pt-2">
            <p className="text-xs text-gray-400">From Smart Account: {smartAccountAddress ? `${smartAccountAddress.substring(0, 6)}...${smartAccountAddress.substring(smartAccountAddress.length - 4)}` : 'Loading...'}</p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          className="w-full bg-[#85FF00] text-black hover:bg-[#85FF00]/80" 
          disabled={!isReady || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Send Gasless Tip
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
