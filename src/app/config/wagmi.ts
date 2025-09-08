'use client';

import { http, createConfig } from 'wagmi';
import { arbitrum, optimism, mainnet } from 'wagmi/chains';
import { 
  metaMask,
  walletConnect,
  coinbaseWallet,
  injected
} from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrum, optimism],
  connectors: [
    metaMask(),
    walletConnect({
      projectId,
      metadata: {
        name: 'Rage Trade Dashboard',
        description: 'Web3 Dashboard for Token Management',
        url: 'https://dashboard.rage.trade',
        icons: ['https://dashboard.rage.trade/logo.svg']
      }
    }),
    coinbaseWallet({
      appName: 'Rage Trade Dashboard',
      appLogoUrl: 'https://dashboard.rage.trade/logo.svg'
    }),
    injected({ shimDisconnect: true })
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}
