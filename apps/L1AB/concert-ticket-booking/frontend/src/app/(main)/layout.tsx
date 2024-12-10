
import { AuthProvider } from '@/components';
import { MainFooter, MainNavbar } from '@/components/maincomponents';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/components/providers/ApolloWrapper';


export const metadata = {
  title: 'Concert Ticket Booking',
  description: 'Generated by create-nx-workspace',
};

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background-main))] root:text-[hsl(var(--foreground))] dark:bg-[hsl(var(--background-main))]">
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
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
      </ThemeProvider>
    </div>
  );
};

export default MainLayout;
