import { AuthProvider } from '@/components';
import { MainFooter, MainNavbar } from '@/components/maincomponents';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Concert Ticket Booking',
  description: 'Generated by create-nx-workspace',
};

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col h-full bg-black ">
      <AuthProvider>
        <header>
          <MainNavbar />
        </header>
        <main>
          <div>{children}</div>
        </main>
      </AuthProvider>
      <footer>
        <MainFooter />
      </footer>
    </div>
  );
};

export default MainLayout;
