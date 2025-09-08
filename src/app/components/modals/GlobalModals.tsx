'use client';

import { WalletModal } from '../features/connect-wallet/ui/WalletModal';
import { WithdrawModal } from '../features/withdraw/ui/WithdrawModal';
import { useModalSync } from '@/app/hooks/useModalSync';

export function GlobalModals() {
  const { 
    isConnectModalOpen,
    isWithdrawModalOpen,
    closeModal
  } = useModalSync();

  return (
    <>
      <WalletModal 
        isOpen={isConnectModalOpen}
        onClose={closeModal}
      />
      
      <WithdrawModal 
        isOpen={isWithdrawModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
