'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/app/components/shared/ui/Layout';
import { ConnectWallet } from '@/app/components/features/connect-wallet';
import { useWalletStore } from '@/app/store/walletStore';

export default function ConnectWalletPage() {
  const router = useRouter();
  const { isConnected, connectedWallets } = useWalletStore();

  useEffect(() => {
    if (isConnected && connectedWallets.length > 0) {
      router.push('/account-overview');
    }
  }, [isConnected, connectedWallets.length, router]);

  if (isConnected && connectedWallets.length > 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ConnectWallet />
    </Layout>
  );
}
