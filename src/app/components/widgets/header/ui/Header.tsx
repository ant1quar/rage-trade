'use client';

import Image from 'next/image';
import { Button } from '@/app/components/shared/ui/Button';
import { useModalSync } from '@/app/hooks/useModalSync';
import { WalletIcon } from '@/app/components/shared/ui/Icons';

export function Header() {
  const { openConnectModal } = useModalSync();
  return (
    <header className="w-full bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="RAGE TRADE Logo"
              width={163}
              height={30}
              priority
            />
          </div>
          <div className="flex items-center">
            <Button 
              onClick={openConnectModal}
              variant="primary"
              size="medium"
              className="flex items-center gap-2"
            >
              <WalletIcon size={16} color="#ffffff" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
