'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/app/components/shared/ui/Modal';
import { DollarIcon, MoneyBagIcon, EthereumIcon, ArbitrumIcon, OptimismIcon } from '@/app/components/shared/ui/Icons';
import { TokenData } from '@/app/components/features/account-overview/ui/TokensTable';

interface NetworkOption {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  IconComponent: React.ComponentType<{ size?: number; color?: string; className?: string }>;
}

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet?: string;
  preselectedNetwork?: string;
  preselectedToken?: TokenData;
  availableTokens?: TokenData[];
}

const networks: NetworkOption[] = [
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
    IconComponent: ArbitrumIcon
  },
  {
    id: 'optimism',
    name: 'Optimism',
    color: 'bg-red-500',
    borderColor: 'border-red-500',
    IconComponent: OptimismIcon
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    color: 'bg-gray-600',
    borderColor: 'border-gray-600',
    IconComponent: EthereumIcon
  }
];

export function WithdrawModal({ 
  isOpen, 
  onClose, 
  wallet,
  preselectedNetwork,
  preselectedToken,
  availableTokens = []
}: WithdrawModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState(preselectedNetwork || 'arbitrum');
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(preselectedToken || null);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (preselectedNetwork) {
      setSelectedNetwork(preselectedNetwork);
    }
    if (preselectedToken) {
      setSelectedToken(preselectedToken);
    }
  }, [preselectedNetwork, preselectedToken]);

  const filteredTokens = availableTokens.filter(token => {
    const networkMap: Record<string, string> = {
      'arbitrum': 'Arbitrum',
      'optimism': 'Optimism', 
      'ethereum': 'Ethereum'
    };
    return token.network === networkMap[selectedNetwork];
  });

  const availableBalance = selectedToken ? 
    parseFloat(selectedToken.balance.replace(/[^\d.]/g, '')) : 0;

  const handleMaxClick = () => {
    if (selectedToken) {
      setAmount(availableBalance.toString());
    }
  };

  const isValidAddress = (address: string) => {
    return address.length > 0 && address.startsWith('0x') && address.length === 42;
  };

  const isValidAmount = (amount: string) => {
    const numAmount = parseFloat(amount);
    return numAmount > 0 && numAmount <= availableBalance;
  };

  const isFormValid = selectedToken && isValidAddress(address) && isValidAmount(amount);

  const handleWithdraw = () => {
    console.log('Withdraw:', {
      network: selectedNetwork,
      token: selectedToken,
      address,
      amount
    });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Withdraw"
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Network Selection */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-3">
            Network
          </label>
          <div className="flex gap-3">
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => setSelectedNetwork(network.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedNetwork === network.id
                    ? `${network.borderColor} bg-gray-800/50`
                    : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                }`}
              >
                <network.IconComponent 
                  size={16} 
                  color={selectedNetwork === network.id ? '#ffffff' : '#9ca3af'} 
                />
                <span className="text-white text-sm font-medium">
                  {network.name}
                </span>
                {network.id === 'optimism' && (
                  <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                    OP
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Address Input */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-3">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
              address && !isValidAddress(address) 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-700 focus:border-blue-500'
            }`}
          />
          {address && !isValidAddress(address) && (
            <p className="text-red-400 text-sm mt-1">Please enter a valid Ethereum address</p>
          )}
        </div>

        {/* Token Selection & Amount */}
        <div>
          <div className="flex gap-4">
            {/* Token Select */}
            <div className="flex-1">
              <label className="block text-gray-400 text-sm font-medium mb-3">
                Token
              </label>
              <select
                value={selectedToken?.symbol || ''}
                onChange={(e) => {
                  const token = filteredTokens.find(t => t.symbol === e.target.value);
                  setSelectedToken(token || null);
                  setAmount('');
                }}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none"
              >
                <option value="">Select token</option>
                {filteredTokens.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Input */}
            <div className="flex-1">
              <label className="block text-gray-400 text-sm font-medium mb-3">
                Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="any"
                  min="0"
                  max={availableBalance}
                  className={`w-full px-4 py-3 pr-16 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                    amount && !isValidAmount(amount)
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-700 focus:border-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleMaxClick}
                  disabled={!selectedToken}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 text-sm font-medium disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer"
                >
                  Max
                </button>
              </div>
            </div>
          </div>
          {amount && !isValidAmount(amount) && selectedToken && (
            <p className="text-red-400 text-sm">
              Amount must be between 0 and {availableBalance} {selectedToken.symbol}
            </p>
          )}
        </div>

        {/* Available Balance */}
        {selectedToken && (
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <span className="text-gray-400 text-sm">Available Balance</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">
                {selectedToken.balance}
              </span>
              <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 4V10H7M23 20V14H17M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          disabled={!isFormValid}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed cursor-pointer text-white font-semibold rounded-lg transition-all"
        >
          {amount && selectedToken ? 
            `Withdraw ${amount} ${selectedToken.symbol}` : 
            'Withdraw'
          }
        </button>
      </div>
    </Modal>
  );
}
