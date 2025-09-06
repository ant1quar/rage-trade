'use client';

import { Modal } from '@/app/components/shared/ui';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  connected?: boolean;
}

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const walletOptions: WalletOption[] = [
  {
    id: 'trust-wallet',
    name: 'Trust Wallet',
    icon: 'trust',
    connected: true
  },
  {
    id: 'wallet-connect',
    name: 'WalletConnect',
    icon: 'walletconnect'
  }
];

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const handleWalletClick = (walletId: string) => {
    console.log(`Connecting to ${walletId}...`);
    // TODO: Implement wallet connection logic
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Connect Your Wallet"
    >
      {/* Wallet Options */}
      <div className="space-y-3">
        {walletOptions.map((wallet) => (
          <button
            key={wallet.id}
            onClick={() => handleWalletClick(wallet.id)}
            className="w-full flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-opacity-80 cursor-pointer"
            style={{
              background: '#13152080',
              border: '1px solid #26293F'
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                {wallet.icon === 'trust' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )}
              </div>
              <span className="text-white font-medium">{wallet.name}</span>
            </div>
            
            {wallet.connected && (
              <div className="flex items-center space-x-2">
                <span className="text-green-400 text-sm font-medium">Connected</span>
                <div className="w-4 h-4 bg-green-400 rounded-full border-4 border-green-100"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
}
