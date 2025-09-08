'use client';

import { useConnect } from 'wagmi';
import { Modal } from '@/app/components/shared/ui';
import { useWalletStore } from '@/app/store/walletStore';
import type { Connector } from 'wagmi';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectors, connect, isPending } = useConnect();
  const { addWallet } = useWalletStore();

  const handleWalletClick = (connector: Connector) => {
    try {
      connect({ 
        connector,
      }, {
        onSuccess: (data) => {
          if (data && data.accounts && data.accounts[0]) {
            addWallet({
              address: data.accounts[0],
              name: connector.name,
              connector: connector.id,
              chainId: data.chainId
            });
            onClose();
          }
        },
        onError: (error) => {
          console.error('Failed to connect wallet:', error);
        }
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const getWalletIcon = (connectorId: string) => {
    switch (connectorId) {
      case 'metaMask':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
          </svg>
        );
      case 'walletConnect':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case 'coinbaseWallet':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
          </svg>
        );
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Connect Your Wallet"
    >
      <div className="space-y-3">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => handleWalletClick(connector)}
            disabled={isPending}
            className="w-full flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-opacity-80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: '#13152080',
              border: '1px solid #26293F'
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                {getWalletIcon(connector.id)}
              </div>
              <span className="text-white font-medium">{connector.name}</span>
            </div>
            
            {isPending && (
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-sm font-medium">Connecting...</span>
                <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
}
