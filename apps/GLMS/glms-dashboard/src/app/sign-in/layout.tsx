import { FederationProvider } from '@/common/providers';

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
