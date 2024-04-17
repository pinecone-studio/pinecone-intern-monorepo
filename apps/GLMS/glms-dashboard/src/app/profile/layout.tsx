import { FederationProvider } from '@/common/providers';
import Header from '../../components/Header';

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <FederationProvider>
        <body>
          <Header />
          {children}
        </body>
      </FederationProvider>
    </html>
  );
};
export default DashboardRootLayout;
