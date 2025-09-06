'use client';

import { useState } from 'react';
import { WalletIcon, DollarIcon, ArrowUpIcon, EthereumIcon, ArbitrumIcon, OptimismIcon } from '@/app/components/shared/ui/Icons';
import { WithdrawModal } from '@/app/components/features/withdraw';
import { TokenData } from './TokensTable';

interface WalletRowProps {
  wallet: string;
  allocation: string;
  chains: string[];
  balance: string;
  balanceUsd: string;
  tokens: TokenData[];
  onWithdraw?: (wallet: string, tokens: TokenData[]) => void;
}

function WalletRow({ wallet, allocation, chains, balance, balanceUsd, tokens, onWithdraw }: WalletRowProps) {
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
        <button 
          onClick={() => onWithdraw?.(wallet, tokens)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
        >
          <ArrowUpIcon size={16} color="#ffffff" />
          Withdraw
        </button>
      </td>
    </tr>
  );
}

export function WalletsTable() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [selectedWalletTokens, setSelectedWalletTokens] = useState<TokenData[]>([]);

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

  const handleWithdraw = (wallet: string, tokens: TokenData[]) => {
    setSelectedWallet(wallet);
    setSelectedWalletTokens(tokens);
    setIsWithdrawModalOpen(true);
  };

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
                  onWithdraw={handleWithdraw}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        wallet={selectedWallet}
        availableTokens={selectedWalletTokens}
      />
    </>
  );
}
