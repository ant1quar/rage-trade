'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/app/components/shared/ui/Button';
import { useModalSync } from '@/app/hooks/useModalSync';
import { WalletIcon } from '@/app/components/shared/ui/Icons';

export function Header() {
  const { openConnectModal } = useModalSync();
  const pathname = usePathname();

  const navItems = [
    { href: '/connect-wallet', label: 'Connect Wallet' },
    { href: '/account-overview', label: 'Account Overview' }
  ];

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

          <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

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
