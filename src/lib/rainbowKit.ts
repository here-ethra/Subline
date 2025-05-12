
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
import { baseGoerli } from 'wagmi/chains';

// Using Base Goerli testnet for development
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'; // Replace with actual project ID in production

const { wallets } = getDefaultWallets({
  appName: 'Context News App',
  projectId,
});

export const wagmiConfig = createConfig({
  chains: [baseGoerli],
  transports: {
    [baseGoerli.id]: http(),
  },
  connectors: wallets,
  storage: createStorage({ storage: window.localStorage }),
});

export { RainbowKitProvider };
