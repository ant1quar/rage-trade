'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useModalStore, ModalType } from '../store/modalStore';

const VALID_MODAL_TYPES = ['connect', 'withdraw'] as const;

export function useModalSync() {
  const searchParams = useSearchParams();
  const { activeModal, openModal, closeModal } = useModalStore();
  
  useEffect(() => {
    const modalParam = searchParams.get('modal');
    const targetModal = modalParam && VALID_MODAL_TYPES.includes(modalParam as typeof VALID_MODAL_TYPES[number]) ? modalParam as ModalType : null;
    
    if (targetModal) {
      openModal(targetModal);
    }
  }, [searchParams, openModal]);

  return {
    openConnectModal: () => openModal('connect'),
    openWithdrawModal: () => openModal('withdraw'),
    closeModal,
    isConnectModalOpen: activeModal === 'connect',
    isWithdrawModalOpen: activeModal === 'withdraw',
  };
}
