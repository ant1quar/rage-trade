'use client';

import { ArrowUpIcon } from '@/app/components/shared/ui/Icons';
import { useModalSync } from '@/app/hooks/useModalSync';
import { TokenData } from '@/app/components/features/tokens-table';
import { useWithdrawStore } from '../store/withdrawStore';

interface WithdrawButtonProps {
  wallet: string;
  tokens: TokenData[];
  className?: string;
}

export function WithdrawButton({ wallet, tokens, className }: WithdrawButtonProps) {
  const { openWithdrawModal } = useModalSync();
  const { setWithdrawData } = useWithdrawStore();

  const handleWithdraw = () => {
    setWithdrawData(wallet, tokens);
    openWithdrawModal();
  };

  return (
    <button 
      onClick={handleWithdraw}
      className={`bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 cursor-pointer ${className || ''}`}
    >
      <ArrowUpIcon size={16} color="#ffffff" />
      Withdraw
    </button>
  );
}
