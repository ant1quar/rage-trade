'use client';

import { useState } from 'react';
import { Layout } from '@/app/components/shared/ui/Layout';
import { Tabs } from '@/app/components/shared/ui/Tabs';
import { MetamaskTokens } from '@/app/components/features/account-overview/ui/MetamaskTokens';
import { HyperliquidTokens } from '@/app/components/features/account-overview/ui/HyperliquidTokens';
import { WalletsTable } from '../components/features/account-overview/ui/WalletsTable';

export default function AccountOverviewPage() {
  const [activeTab, setActiveTab] = useState('totalBalance');

  const tabs = [
    {
      id: 'totalBalance',
      label: 'Total Balance',
      content: <WalletsTable />
    },
    {
      id: 'metamask',
      label: 'Metamask',
      content: <MetamaskTokens />
    },
    {
      id: 'hyperliquid',
      label: 'Hyperliquid',
      content: <HyperliquidTokens />
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
