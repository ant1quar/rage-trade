'use client';

import { useState } from 'react';
import { Layout } from '@/app/components/shared/ui/Layout';
import { Tabs } from '@/app/components/shared/ui/Tabs';
import { TokensTable, TokenData } from '@/app/components/features/account-overview/ui/TokensTable';
import { WalletsTable } from '../components/features/account-overview/ui/WalletsTable';

export default function AccountOverviewPage() {
  const [activeTab, setActiveTab] = useState('totalBalance');

  const metamaskTokens: TokenData[] = [
    {
      token: 'USD Coin',
      symbol: 'USDC',
      network: 'Arbitrum',
      balance: '1,000.00 USDC',
      balanceUsd: '$1,000.00',
      price: '$1.00'
    },
    {
      token: 'Wrapped Bitcoin',
      symbol: 'WBTC',
      network: 'Arbitrum',
      balance: '0.025 WBTC',
      balanceUsd: '$2,500.00',
      price: '$100,000.00'
    },
    {
      token: 'Ethereum',
      symbol: 'ETH',
      network: 'Optimism',
      balance: '1.5 ETH',
      balanceUsd: '$6,000.00',
      price: '$4,000.00'
    },
    {
      token: 'USD Tether',
      symbol: 'USDT',
      network: 'Optimism',
      balance: '500.00 USDT',
      balanceUsd: '$500.00',
      price: '$1.00'
    }
  ];

  const hyperliquidTokens: TokenData[] = [
    {
      token: 'USD Coin',
      symbol: 'USDC',
      network: 'Hyperliquid',
      balance: '2,000.00 USDC',
      balanceUsd: '$2,000.00',
      price: '$1.00'
    },
    {
      token: 'Solana',
      symbol: 'SOL',
      network: 'Hyperliquid',
      balance: '10.0 SOL',
      balanceUsd: '$2,500.00',
      price: '$250.00'
    }
  ];

  const tabs = [
    {
      id: 'totalBalance',
      label: 'Total Balance',
      content: <WalletsTable />
    },
    {
      id: 'metamask',
      label: 'Metamask',
      content: <TokensTable tokens={metamaskTokens} />
    },
    {
      id: 'hyperliquid',
      label: 'Hyperliquid',
      content: <TokensTable tokens={hyperliquidTokens} />
    }
  ];

  return (
    <Layout>
      <div className="px-6 py-8">
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </Layout>
  );
}
