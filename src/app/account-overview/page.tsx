import { Layout } from '@/app/components/shared/ui/Layout';
import { BalanceTags } from '@/app/components/features/account-overview/ui/BalanceTags';
import { WalletsTable } from '@/app/components/features/account-overview/ui/WalletsTable';
import { TokensTable } from '@/app/components/features/account-overview/ui/TokensTable';

export default function AccountOverviewPage() {
  return (
    <Layout>
      <div className="px-6 py-8 space-y-8">
        <BalanceTags />
        <WalletsTable />
        <TokensTable />
      </div>
    </Layout>
  );
}
