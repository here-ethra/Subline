
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import {
  http,
  createConfig,
  createStorage,
} from 'wagmi';
import { base } from 'wagmi/chains';
import {
  createAlchemySmartAccountClient,
  // no SmartAccountClient exported here in latest versions
} from "@alchemy/aa-alchemy";
import { createMultiOwnerModularAccount } from "@alchemy/aa-accounts";
import {
  LocalAccountSigner,
  type SmartContractAccount,
} from "@alchemy/aa-core";
import { parseEther, formatUnits, type Address } from 'viem';

// Using Base mainnet for production
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'; // Replace with actual project ID in production

// Alchemy API Key for Base
const alchemyApiKey = 'demo'; // Replace with actual Alchemy API key in production

const { connectors } = getDefaultWallets({
  appName: 'Context News App',
  projectId,
});

// *** FIX: Use "transports" for wagmi v2 ***
export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors,
  storage: createStorage({ storage: window.localStorage }),
});

// Smart account factory function
export async function createSmartAccount(ownerAddress: Address) {
  try {
    console.log("Creating smart account for:", ownerAddress);

    // The "owners" param should be an array of Address
    const owners: Address[] = [ownerAddress];

    // Create the smart account
    const account = await createMultiOwnerModularAccount({
      owners,
      chain: base,
      entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as Address,
      factoryAddress: "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985" as Address,
    });

    const smartAccountClient = await createAlchemySmartAccountClient({
      apiKey: alchemyApiKey,
      chain: base,
      account,
      gasManagerConfig: {
        policyId: "42", // Replace with real policy ID in prod
      },
    });

    console.log("Smart account created:", smartAccountClient.account?.address);
    return smartAccountClient;
  } catch (error) {
    console.error("Error creating smart account:", error);
    throw error;
  }
}

// Function to send tip using smart account (gasless)
export async function sendTip(toAddress: Address, amount: bigint, smartAccountClient: any) {
  try {
    console.log(`Sending tip: ${formatUnits(amount, 18)} ETH to ${toAddress}`);

    // Prepare the transaction
    const tx = await smartAccountClient.sendTransaction({
      to: toAddress,
      value: amount,
      data: "0x",
    });

    console.log("Transaction sent successfully:", tx);
    return tx;
  } catch (error) {
    console.error("Error sending tip:", error);
    throw error;
  }
}

export { RainbowKitProvider, parseEther };

