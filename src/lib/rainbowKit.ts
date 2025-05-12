
import '@rainbow-me/rainbowkit/styles.css';

import { 
  getDefaultWallets,
  RainbowKitProvider 
} from '@rainbow-me/rainbowkit';
import { 
  http, 
  createConfig, 
  createStorage 
} from 'wagmi';
import { base } from 'wagmi/chains';

// Using Base mainnet for production
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'; // Replace with actual project ID in production

const { connectors } = getDefaultWallets({
  appName: 'Context News App',
  projectId,
});

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors,
  storage: createStorage({ storage: window.localStorage }),
});

export { RainbowKitProvider };
