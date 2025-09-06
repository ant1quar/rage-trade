'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useModalStore, ModalType } from '../store/modalStore';

const VALID_MODAL_TYPES = ['connect', 'withdraw'] as const;

export function useModalSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { activeModal, openModal, closeModal } = useModalStore();
  
  const isUpdatingFromUrl = useRef(false);
  const isUpdatingFromModal = useRef(false);
  useEffect(() => {
    if (isUpdatingFromModal.current) {
      isUpdatingFromModal.current = false;
      return;
    }

    const modalParam = searchParams.get('modal');
    const targetModal = modalParam && VALID_MODAL_TYPES.includes(modalParam as typeof VALID_MODAL_TYPES[number]) ? modalParam as ModalType : null;
    
    if (targetModal !== activeModal) {
      isUpdatingFromUrl.current = true;
      if (targetModal) {
        openModal(targetModal);
      } else {
        closeModal();
      }
    }
  }, [searchParams, activeModal, openModal, closeModal]);
  useEffect(() => {
    if (isUpdatingFromUrl.current) {
      isUpdatingFromUrl.current = false;
      return;
    }

    const currentModalParam = searchParams.get('modal');
    
    if (currentModalParam !== activeModal) {
      isUpdatingFromModal.current = true;
      const currentParams = new URLSearchParams(searchParams.toString());
      
      if (activeModal) {
        currentParams.set('modal', activeModal);
      } else {
        currentParams.delete('modal');
      }
      
      router.replace(`?${currentParams.toString()}`, { scroll: false });
    }
  }, [activeModal, router, searchParams]);

  return {
    openConnectModal: () => openModal('connect'),
    openWithdrawModal: () => openModal('withdraw'),
    closeModal,
    isConnectModalOpen: activeModal === 'connect',
    isWithdrawModalOpen: activeModal === 'withdraw',
  };
}
