'use client';

import { create } from 'zustand';

export type ModalType = 'connect' | 'withdraw' | null;

interface ModalStore {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  isModalOpen: (modal: ModalType) => boolean;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  activeModal: null,
  
  openModal: (modal) => {
    set({ activeModal: modal });
  },
  
  closeModal: () => {
    set({ activeModal: null });
  },
  
  isModalOpen: (modal) => {
    return get().activeModal === modal;
  },
}));
