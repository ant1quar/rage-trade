'use client';

import { WalletIcon, DollarIcon, MoneyBagIcon } from '@/app/components/shared/ui/Icons';

interface BalanceTagProps {
  label: string;
  amount: string;
  IconComponent?: React.ComponentType<any>;
}

function BalanceTag({ label, amount, IconComponent }: BalanceTagProps) {
  return (
    <div className="bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
        {IconComponent && <IconComponent size={20} className="text-blue-400" />}
        {label}
      </div>
      <div className="text-white font-semibold text-lg">{amount}</div>
    </div>
  );
}

export function BalanceTags() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <BalanceTag 
        label="Balance" 
        amount="$37,555.24" 
        IconComponent={WalletIcon}
      />
      <BalanceTag 
        label="Metamask" 
        amount="$132.81" 
        IconComponent={WalletIcon}
      />
      <BalanceTag 
        label="Hyperliquid" 
        amount="$132.81" 
        IconComponent={DollarIcon}
      />
      <BalanceTag 
        label="Total" 
        amount="$165.39" 
        IconComponent={MoneyBagIcon}
      />
    </div>
  );
}
