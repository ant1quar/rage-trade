'use client';

import { useConnect } from 'wagmi';
import { Modal } from '@/app/components/shared/ui';
import { useWalletStore } from '@/app/store/walletStore';
import type { Connector } from 'wagmi';
import { 
  WalletBold, 
  ShieldCheckBold, 
  LinkBold, 
  CardBold 
} from 'solar-icon-set';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectors, connect, isPending } = useConnect();
  const { addWallet, connectedWallets, removeWallet } = useWalletStore();

  const isWalletConnected = (connectorId: string) => {
    return connectedWallets.some(wallet => wallet.connector === connectorId);
  };

  const getConnectedWallet = (connectorId: string) => {
    return connectedWallets.find(wallet => wallet.connector === connectorId);
  };

  const handleWalletClick = (connector: Connector) => {
    const connectedWallet = getConnectedWallet(connector.id);
    
    if (connectedWallet) {
      removeWallet(connectedWallet.address);
      return;
    }

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
    const iconProps = { size: 24, color: 'currentColor' };
    
    switch (connectorId) {
      case 'metaMask':
        return <ShieldCheckBold {...iconProps} />;
      case 'walletConnect':
        return <LinkBold {...iconProps} />;
      case 'coinbaseWallet':
        return <CardBold {...iconProps} />;
      default:
        return <WalletBold {...iconProps} />;
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Connect Your Wallet"
    >
      <div className="space-y-3">
        {connectors.map((connector) => {
          const isConnected = isWalletConnected(connector.id);
          const connectedWallet = getConnectedWallet(connector.id);
          
          return (
            <button
              key={connector.id}
              onClick={() => handleWalletClick(connector)}
              disabled={isPending && !isConnected}
              className="w-full flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-opacity-80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isConnected ? '#1a5f3e80' : '#13152080',
                border: isConnected ? '1px solid #22c55e' : '1px solid #26293F'
              }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                  isConnected ? 'bg-green-600' : 'bg-blue-500'
                }`}>
                  {getWalletIcon(connector.id)}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white font-medium">{connector.name}</span>
                  {isConnected && connectedWallet && (
                    <span className="text-gray-400 text-sm">
                      {connectedWallet.address.slice(0, 6)}...{connectedWallet.address.slice(-4)}
                    </span>
                  )}
                </div>
              </div>
              
              {isConnected ? (
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-sm font-medium">Connected</span>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              ) : isPending ? (
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-sm font-medium">Connecting...</span>
                  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <span className="text-gray-400 text-sm">Click to connect</span>
              )}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
