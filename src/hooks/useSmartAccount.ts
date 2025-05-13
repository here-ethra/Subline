
import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { Address, parseEther } from 'viem';
import { createSmartAccount, sendTip as sendTipWithSmartAccount } from '@/lib/rainbowKit';
import { toast } from '@/components/ui/sonner';

interface SmartAccountState {
  smartAccountAddress: string | null;
  isCreating: boolean;
  isReady: boolean;
  error: string | null;
  smartAccountClient: any | null;
}

export function useSmartAccount() {
  const { address, isConnected } = useAccount();
  const [state, setState] = useState<SmartAccountState>({
    smartAccountAddress: null,
    isCreating: false,
    isReady: false,
    error: null,
    smartAccountClient: null,
  });

  // Initialize smart account when user connects wallet
  useEffect(() => {
    const initSmartAccount = async () => {
      if (!isConnected || !address) {
        setState(prev => ({ ...prev, isReady: false, smartAccountClient: null, smartAccountAddress: null }));
        return;
      }

      try {
        setState(prev => ({ ...prev, isCreating: true, error: null }));
        
        console.log("Initializing smart account for address:", address);
        const smartAccountClient = await createSmartAccount(address as Address, null);
        
        if (!smartAccountClient?.account?.address) {
          throw new Error("Failed to create smart account: No address returned");
        }
        
        console.log("Smart account created with address:", smartAccountClient.account.address);
        
        setState({
          smartAccountAddress: smartAccountClient.account.address as string,
          isCreating: false,
          isReady: true,
          error: null,
          smartAccountClient,
        });
      } catch (error) {
        console.error("Error initializing smart account:", error);
        setState(prev => ({
          ...prev,
          isCreating: false,
          error: error instanceof Error ? error.message : "Unknown error creating smart account",
        }));
      }
    };

    if (isConnected && address) {
      initSmartAccount();
    }
  }, [address, isConnected]);

  // Function to send a tip using the smart account
  const sendTip = useCallback(async (toAddress: string, amount: string) => {
    if (!state.isReady || !state.smartAccountClient) {
      toast({
        title: "Smart account not ready",
        description: "Please wait for your smart account to be initialized",
        variant: "destructive"
      });
      return null;
    }

    try {
      const amountInWei = parseEther(amount);
      
      toast({
        title: "Sending tip...",
        description: `Sending ${amount} ETH to ${toAddress}`,
      });
      
      const txHash = await sendTipWithSmartAccount(
        toAddress as Address, 
        amountInWei, 
        state.smartAccountClient
      );
      
      toast({
        title: "Tip sent successfully",
        description: `Transaction hash: ${txHash.slice(0, 10)}...`,
        variant: "success",
      });
      
      return txHash;
    } catch (error) {
      console.error("Error sending tip:", error);
      
      toast({
        title: "Error sending tip",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
      
      return null;
    }
  }, [state.isReady, state.smartAccountClient]);

  return {
    smartAccountAddress: state.smartAccountAddress,
    isCreating: state.isCreating,
    isReady: state.isReady,
    error: state.error,
    sendTip,
  };
}
