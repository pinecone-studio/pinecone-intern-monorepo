import { FederationProvider } from '../common';
import './global.css';

import { cn } from '../lib/utils';

export const metadata = {
  title: 'Welcome to report-dashboard',
  description: 'WELCOME',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <FederationProvider>
        <body className={cn('min-h-screen bg-background font-sans antialiased')}>{children}</body>
      </FederationProvider>
    </html>
  );
};
export default RootLayout;
