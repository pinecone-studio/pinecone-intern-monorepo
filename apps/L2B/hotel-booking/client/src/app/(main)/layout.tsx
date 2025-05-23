'use client';
import Header from '../_components/Header';
import { usePathname } from 'next/navigation';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const hideHeaderRoutes = ['/signin', '/signup'];

  const blueBgRoutes = ['/', '/search-result', '/hotel-detail'];

  const showHeader = !hideHeaderRoutes.includes(pathname);
  const bgColor = blueBgRoutes.includes(pathname) ? 'blue' : 'white';

  return (
    <html>
      <body>
        {showHeader && <Header bg={bgColor} />}
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
