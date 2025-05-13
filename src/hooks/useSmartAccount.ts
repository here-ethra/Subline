
import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import { createSmartAccount, sendTip as sendTipWithSmartAccount, parseEther } from '@/lib/rainbowKit';
import { toast } from '@/components/ui/sonner';

// Define a proper type for the smart account client
type SmartAccountClient = {
  account: {
    address: string;
  };
  [key: string]: any;
};

interface SmartAccountState {
  smartAccountAddress: string | null;
  isCreating: boolean;
  isReady: boolean;
  error: string | null;
  smartAccountClient: SmartAccountClient | null;
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
        const smartAccountClient = await createSmartAccount(address as Address);
        
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
      toast.error("Smart account not ready. Please wait for your smart account to be initialized.");
      return null;
    }

    try {
      const amountInWei = parseEther(amount);
      
      toast.promise(
        sendTipWithSmartAccount(
          toAddress as Address, 
          amountInWei, 
          state.smartAccountClient
        ),
        {
          loading: `Sending ${amount} ETH to ${toAddress}...`,
          success: (txHash) => {
            return `Tip sent successfully! TX: ${typeof txHash === 'string' ? txHash.slice(0, 10) : ''}...`;
          },
          error: (error) => {
            return error instanceof Error ? error.message : "Unknown error sending tip";
          }
        }
      );
      
      const txHash = await sendTipWithSmartAccount(
        toAddress as Address, 
        amountInWei, 
        state.smartAccountClient
      );
      
      return txHash;
    } catch (error) {
      console.error("Error sending tip:", error);
      toast.error(error instanceof Error ? error.message : "Unknown error sending tip");
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
