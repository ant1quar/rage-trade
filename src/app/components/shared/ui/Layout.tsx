import { ReactNode } from 'react';
import { Header } from '@/app/components/widgets/header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
