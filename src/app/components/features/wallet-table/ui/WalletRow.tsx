'use client';

import { WalletIcon, DollarIcon, EthereumIcon, ArbitrumIcon, OptimismIcon } from '@/app/components/shared/ui/Icons';
import { TokenData } from '@/app/components/features/tokens-table';
import { WithdrawButton } from '@/app/components/features/withdraw/ui/WithdrawButton';

export interface WalletRowProps {
  wallet: string;
  allocation: string;
  chains: string[];
  balance: string;
  balanceUsd: string;
  tokens: TokenData[];
}

export function WalletRow({ wallet, allocation, chains, balance, balanceUsd, tokens }: WalletRowProps) {
  const getWalletIcon = (wallet: string) => {
    switch (wallet) {
      case 'Metamask':
        return <WalletIcon size={20} color="#fb923c" />;
      case 'Hyperliquid':
        return <DollarIcon size={20} color="#60a5fa" />;
      default:
        return <WalletIcon size={20} color="#9ca3af" />;
    }
  };

  return (
    <tr className="border-b border-gray-700">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            {getWalletIcon(wallet)}
          </div>
          <span className="text-white font-medium">{wallet}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-white">{allocation}</td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          {chains.map((chain, index) => (
            <div key={index} className="flex items-center gap-1">
              {chain === 'Optimism' && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <OptimismIcon size={14} color="#ffffff" />
                </div>
              )}
              {chain === 'Arbitrum' && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <ArbitrumIcon size={14} color="#ffffff" />
                </div>
              )}
              {chain === 'Ethereum' && (
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <EthereumIcon size={14} color="#ffffff" />
                </div>
              )}
              {chain === 'Hyperliquid' && (
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                  <DollarIcon size={14} color="#ffffff" />
                </div>
              )}
            </div>
          ))}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="text-white font-medium">{balance}</div>
        <div className="text-gray-400 text-sm">{balanceUsd}</div>
      </td>
      <td className="py-4 px-6">
        <WithdrawButton wallet={wallet} tokens={tokens} />
      </td>
    </tr>
  );
}
