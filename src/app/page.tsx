import { Layout } from '@/app/components/shared/ui/Layout';
import { ConnectWallet } from '@/app/components/features/connect-wallet';

export default function Home() {
  return (
    <Layout>
      <ConnectWallet />
    </Layout>
  );
}
