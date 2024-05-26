import { FederationProvider } from '../common';
import './global.css';

export const metadata = {
  title: 'Welcome to report-dashboard',
  description: 'WELCOME',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <FederationProvider>
        <body>{children}</body>
      </FederationProvider>
    </html>
  );
};
export default RootLayout;
