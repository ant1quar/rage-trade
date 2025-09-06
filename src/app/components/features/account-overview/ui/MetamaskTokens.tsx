'use client';

import { WalletIcon, DollarIcon, MoneyBagIcon } from '@/app/components/shared/ui/Icons';

interface TokenRowProps {
  token: string;
  symbol: string;
  network: string;
  balance: string;
  balanceUsd: string;
  price: string;
}

function TokenRow({ token, symbol, network, balance, balanceUsd, price }: TokenRowProps) {
  const getNetworkIcon = (network: string) => {
    switch (network) {
      case 'Arbitrum':
        return (
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <DollarIcon size={12} color="#ffffff" />
          </div>
        );
      case 'Optimism':
        return (
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            OP
          </div>
        );
      case 'Ethereum':
        return (
          <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
            <DollarIcon size={12} color="#ffffff" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <tr className="border-b border-gray-700">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <MoneyBagIcon size={20} color="#facc15" />
          </div>
          <div>
            <div className="text-white font-medium">{token}</div>
            <div className="text-gray-400 text-sm">{symbol}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          {getNetworkIcon(network)}
          <span className="text-white">{network}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="text-white font-medium">{balance}</div>
        <div className="text-gray-400 text-sm">{balanceUsd}</div>
      </td>
      <td className="py-4 px-6 text-white">{price}</td>
    </tr>
  );
}

export function MetamaskTokens() {
  const tokens = [
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

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="py-4 px-6 text-left text-gray-400 font-medium">Token</th>
              <th className="py-4 px-6 text-left text-gray-400 font-medium">Network</th>
              <th className="py-4 px-6 text-left text-gray-400 font-medium">Balance</th>
              <th className="py-4 px-6 text-left text-gray-400 font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <TokenRow key={index} {...token} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
