'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWalletStore } from './store/walletStore';

export default function Home() {
  const router = useRouter();
  const { isConnected, connectedWallets } = useWalletStore();

  useEffect(() => {
    if (isConnected && connectedWallets.length > 0) {
      router.push('/account-overview');
    } else {
      router.push('/connect-wallet');
    }
  }, [isConnected, connectedWallets.length, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}
