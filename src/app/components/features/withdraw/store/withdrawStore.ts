'use client';

import { create } from 'zustand';
import { TokenData } from '@/app/components/features/tokens-table';

interface WithdrawStore {
  selectedWallet: string;
  selectedWalletTokens: TokenData[];
  setWithdrawData: (wallet: string, tokens: TokenData[]) => void;
  clearWithdrawData: () => void;
}

export const useWithdrawStore = create<WithdrawStore>((set) => ({
  selectedWallet: '',
  selectedWalletTokens: [],
  
  setWithdrawData: (wallet, tokens) => {
    set({ 
      selectedWallet: wallet, 
      selectedWalletTokens: tokens 
    });
  },
  
  clearWithdrawData: () => {
    set({ 
      selectedWallet: '', 
      selectedWalletTokens: [] 
    });
  },
}));
