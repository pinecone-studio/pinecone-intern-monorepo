import { FederationProvider, Header } from '../common';
import './global.css';
import { Sidebar } from '../common/components/Sidebar';
import { LeaveRequestCreationProvider } from './leaving/_providers/LeaveRequestCreationProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { DataProvider } from './employee-details/provider/DataProvider';
import { AuthProvider } from '@/common/providers/AuthProvider';

export const metadata = {
  title: 'Welcome to hrms-dashboard',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="relative">
        <FederationProvider>
          <DataProvider>
            <AuthProvider>
              <LeaveRequestCreationProvider>
                <div className="flex flex-col flex-1">
                  <Header />

                  <div className="flex flex-col md:flex-row bg-white">

                    <Sidebar />
                    <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
                  </div>
                </div>
              </LeaveRequestCreationProvider>
            </AuthProvider>
          </DataProvider>
        </FederationProvider>
      </body>
    </html>
  );
};
export default RootLayout;
