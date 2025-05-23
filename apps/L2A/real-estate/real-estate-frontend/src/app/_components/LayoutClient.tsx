'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

const LayoutClient = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const hideLayout = pathname === '/signin' || pathname === '/signup';

  return (
    <>
      {!hideLayout && <Header />}
      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
};

export default LayoutClient;
