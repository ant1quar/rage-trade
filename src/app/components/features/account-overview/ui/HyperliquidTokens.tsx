'use client';

import { MoneyBagIcon, DollarIcon } from '@/app/components/shared/ui/Icons';

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
      case 'Hyperliquid':
        return (
          <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
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

export function HyperliquidTokens() {
  const tokens = [
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
