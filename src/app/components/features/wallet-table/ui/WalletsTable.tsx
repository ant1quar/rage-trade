'use client';

import { TokenData } from '@/app/components/features/tokens-table';
import { WalletRow } from './WalletRow';

export function WalletsTable() {

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

  const wallets = [
    {
      wallet: 'Metamask',
      allocation: '20%',
      chains: ['Optimism', 'Arbitrum', 'Ethereum'],
      balance: '1,789.14 USDC',
      balanceUsd: '$1,788.22',
      tokens: metamaskTokens
    },
    {
      wallet: 'Hyperliquid',
      allocation: '20%',
      chains: ['Hyperliquid'],
      balance: '1,789.14 USDC',
      balanceUsd: '$1,788.22',
      tokens: hyperliquidTokens
    }
  ];


  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Wallet</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Allocation</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Chain</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Balance</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet, index) => (
                <WalletRow
                  key={index}
                  wallet={wallet.wallet}
                  allocation={wallet.allocation}
                  chains={wallet.chains}
                  balance={wallet.balance}
                  balanceUsd={wallet.balanceUsd}
                  tokens={wallet.tokens}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
