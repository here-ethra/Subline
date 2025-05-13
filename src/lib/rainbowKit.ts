
import '@rainbow-me/rainbowkit/styles.css';

import { 
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import { 
  http, 
  createConfig, 
  createStorage,
} from 'wagmi';
import { base } from 'wagmi/chains';
import type { Address } from 'viem';
import { 
  createAlchemySmartAccountClient, 
  type AlchemyProvider
} from "@alchemy/aa-alchemy";
import { createMultiOwnerModularAccount } from "@alchemy/aa-accounts";
import { 
  type SmartAccountSigner,
  type SmartContractAccount
} from "@alchemy/aa-core";
import { parseEther, formatUnits } from 'viem';
import { coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';

// Using Base mainnet for production
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'; // Replace with actual project ID in production

// Alchemy API Key for Base
const alchemyApiKey = 'demo'; // Replace with actual Alchemy API key in production

// Use only Coinbase Wallet (remove other wallets)
const { wallets } = getDefaultWallets({
  appName: 'Subline News App',
  projectId,
});

// Fix the coinbaseWallet configuration to match the expected API
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      coinbaseWallet({ appName: 'Subline News App' })
    ],
  },
]);

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors,
  storage: createStorage({ storage: window.localStorage }),
});

// Define a proper return type for createSmartAccount that includes sendTransaction
export interface SmartAccountClient {
  account: {
    address: string;
  };
  sendTransaction: (tx: { to: Address; value: bigint; data: string }) => Promise<string>;
  [key: string]: any;
}

// Smart account factory function
export async function createSmartAccount(ownerAddress: Address, provider?: any): Promise<SmartAccountClient> {
  try {
    console.log("Creating smart account for:", ownerAddress);
    
    // Create a local account signer that acts as the owner of the smart account
    const owner = {
      signerType: "owner",
      address: ownerAddress, 
      signMessage: async () => {
        console.log("Smart account attempting to sign message");
        return "0x" as `0x${string}`; // This is a mock signature for gasless transactions
      },
      signTransaction: async () => {
        console.log("Smart account attempting to sign transaction");
        return "0x" as `0x${string}`; // This is a mock signature for gasless transactions
      },
    } as unknown as SmartAccountSigner;

    // Create the smart account client
    const smartAccountClient = await createAlchemySmartAccountClient({
      apiKey: alchemyApiKey,
      chain: base,
      signer: owner,
      gasManagerConfig: {
        policyId: "42", // Replace with actual policy ID in production
      },
      account: await createMultiOwnerModularAccount({
        owner,
        chain: base,
        entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as Address, // Base entry point
        factoryAddress: "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985" as Address, // Standard factory
      }),
    });
    
    console.log("Smart account created:", smartAccountClient.account?.address);
    return smartAccountClient as SmartAccountClient;
  } catch (error) {
    console.error("Error creating smart account:", error);
    throw error;
  }
}

// Function to send tip using smart account (gasless)
export async function sendTip(
  toAddress: Address, 
  amount: bigint, 
  smartAccountClient: SmartAccountClient
): Promise<string> {
  try {
    console.log(`Sending tip: ${formatUnits(amount, 18)} ETH to ${toAddress}`);

    // Prepare the transaction
    const hash = await smartAccountClient.sendTransaction({
      to: toAddress,
      value: amount,
      data: "0x",
    });

    console.log("Transaction sent successfully:", hash);
    return hash;
  } catch (error) {
    console.error("Error sending tip:", error);
    throw error;
  }
}

export { RainbowKitProvider, parseEther };
