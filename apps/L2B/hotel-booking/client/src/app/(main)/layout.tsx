'use client';
import Header from '../_components/Header';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const hideHeaderRoutes = ['/signin', '/signup'];

  const blueBgRoutes = ['/', '/search-result', '/hotel-detail'];

  const showHeader = !hideHeaderRoutes.includes(pathname);
  const bgColor = blueBgRoutes.includes(pathname) ? 'blue' : 'white';

  return (
    <div>
      {showHeader && <Header bg={bgColor} />}
      {children}
    </div>
  );
};

export default Layout;
