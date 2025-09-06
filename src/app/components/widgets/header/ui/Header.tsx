'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/shared/ui/Button';
import { WalletModal } from '@/app/components/features/connect-wallet';

export function Header() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  const handleCloseWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <header className="w-full bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="RAGE TRADE Logo"
              width={163}
              height={30}
              priority
            />
          </div>

          {/* Connect Wallet Button */}
          <div className="flex items-center">
            <Button 
              onClick={handleConnectWallet}
              variant="primary"
              size="medium"
            >
              🔗 Connect Wallet
            </Button>
          </div>
        </div>
      </div>

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={handleCloseWalletModal} 
      />
    </header>
  );
}
