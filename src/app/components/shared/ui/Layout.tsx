'use client';
import { ReactNode } from 'react';
import { Header } from '@/app/components/widgets/header';
import { WalletModal } from '@/app/components/features/connect-wallet';
import { useModalSync } from '@/app/hooks/useModalSync';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isConnectModalOpen, closeModal } = useModalSync();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="w-full">
        {children}
      </main>
      
      <WalletModal 
        isOpen={isConnectModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
}
