import { ThemeProviderHRMS } from '../common/providers/ThemeProvider';
import { FederationProvider } from '../common';
import './global.css';

export const metadata = {
  title: 'Welcome to hrms-dashboard',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <FederationProvider>
        <ThemeProviderHRMS>
          <body>{children}</body>
        </ThemeProviderHRMS>
      </FederationProvider>
    </html>
  );
};
export default RootLayout;
