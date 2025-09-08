'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ConnectedWallet {
  address: string;
  name: string;
  connector: string;
  chainId?: number;
}

interface WalletStore {
  connectedWallets: ConnectedWallet[];
  activeWallet: string | null;
  isConnected: boolean;
  
  addWallet: (wallet: ConnectedWallet) => void;
  removeWallet: (address: string) => void;
  setActiveWallet: (address: string | null) => void;
  disconnectAll: () => void;
  getWalletByAddress: (address: string) => ConnectedWallet | undefined;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      connectedWallets: [],
      activeWallet: null,
      isConnected: false,

      addWallet: (wallet) => {
        const { connectedWallets } = get();
        const existingWallet = connectedWallets.find(w => w.address === wallet.address);
        
        if (!existingWallet) {
          const newWallets = [...connectedWallets, wallet];
          set({ 
            connectedWallets: newWallets,
            isConnected: true,
            activeWallet: newWallets.length === 1 ? wallet.address : get().activeWallet
          });
        }
      },

      removeWallet: (address) => {
        const { connectedWallets, activeWallet } = get();
        const newWallets = connectedWallets.filter(w => w.address !== address);
        
        set({
          connectedWallets: newWallets,
          isConnected: newWallets.length > 0,
          activeWallet: activeWallet === address 
            ? (newWallets.length > 0 ? newWallets[0].address : null)
            : activeWallet
        });
      },

      setActiveWallet: (address) => {
        set({ activeWallet: address });
      },

      disconnectAll: () => {
        set({
          connectedWallets: [],
          activeWallet: null,
          isConnected: false
        });
      },

      getWalletByAddress: (address) => {
        return get().connectedWallets.find(w => w.address === address);
      }
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        connectedWallets: state.connectedWallets,
        activeWallet: state.activeWallet,
        isConnected: state.isConnected
      })
    }
  )
);
