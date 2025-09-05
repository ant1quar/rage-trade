'use client';

import { Button } from '@/app/components/shared/ui/Button';

export function ConnectWallet() {
  const handleConnect = () => {
    // TODO: Implement wallet connection logic
    console.log('Connecting wallet...');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">
          Connect Your Wallet
        </h1>
        
        <p className="text-gray-400 text-lg">
          This page requires access to your wallet.
          <br />
          Please connect your wallet to continue
        </p>
        
        <Button 
          onClick={handleConnect}
          size="large"
          className="w-full"
        >
          Connect Your Wallet
        </Button>
      </div>
    </div>
  );
}
