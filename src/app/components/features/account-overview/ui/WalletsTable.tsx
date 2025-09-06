'use client';

import { WalletIcon, DollarIcon, ArrowUpIcon } from '@/app/components/shared/ui/Icons';

interface WalletRowProps {
  wallet: string;
  allocation: string;
  chains: string[];
  balance: string;
  balanceUsd: string;
  onWithdraw?: () => void;
}

function WalletRow({ wallet, allocation, chains, balance, balanceUsd, onWithdraw }: WalletRowProps) {
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
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  OP
                </div>
              )}
              {chain === 'Arbitrum' && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <DollarIcon size={14} color="#ffffff" />
                </div>
              )}
              {chain === 'Ethereum' && (
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <DollarIcon size={14} color="#ffffff" />
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
          onClick={onWithdraw}
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
  const wallets = [
    {
      wallet: 'Metamask',
      allocation: '20%',
      chains: ['Optimism', 'Arbitrum', 'Ethereum'],
      balance: '1,789.14 USDC',
      balanceUsd: '$1,788.22'
    },
    {
      wallet: 'Hyperliquid',
      allocation: '20%',
      chains: ['Hyperliquid'],
      balance: '1,789.14 USDC',
      balanceUsd: '$1,788.22'
    }
  ];

  return (
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
                onWithdraw={() => console.log(`Withdraw from ${wallet.wallet}`)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
