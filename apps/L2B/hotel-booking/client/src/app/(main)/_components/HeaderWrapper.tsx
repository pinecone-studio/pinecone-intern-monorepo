'use client';

import Header from '@/app/_components/Header';
import { usePathname } from 'next/navigation';

const HeaderWrapper = () => {
  const pathname = usePathname();

  const hideHeaderRoutes = ['/signin', '/signup'];
  const blueBgRoutes = ['/', '/search-result', '/hotel-detail'];

  const showHeader = !hideHeaderRoutes.includes(pathname);
  const bgColor = blueBgRoutes.includes(pathname) ? 'blue' : 'white';

  return showHeader ? <Header bg={bgColor} /> : null;
};

export default HeaderWrapper;
