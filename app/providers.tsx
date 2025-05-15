'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig } from 'wagmi';
import { baseSepolia, hardhat } from 'wagmi/chains';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not defined');
}

const { wallets } = getDefaultWallets({
  appName: 'Mayordomo DAO',
  projectId,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet,
      trustWallet,
      ledgerWallet,
    ],
  },
], {
  appName: 'Mayordomo DAO',
  projectId,
});

const queryClient = new QueryClient();

// Personalización del tema de RainbowKit
const customTheme = lightTheme({
  accentColor: '#FED800', // colombia-yellow
  accentColorForeground: '#2C5F2D', // colombia-green
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

const config = createConfig({
  chains: [hardhat, baseSepolia],
  transports: {
    [hardhat.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

