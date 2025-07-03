'use client';

import Header from '@/app/_components/Header';
import { usePathname } from 'next/navigation';

const HeaderWrapper = () => {
  const pathname = usePathname();

  const hideHeaderRoutes = ['/signin', '/signup'];
  const shouldHideHeader = hideHeaderRoutes.some((route) => pathname.startsWith(route)) || pathname.startsWith('/hotels') || pathname.startsWith('/guests');
  const blueBgRoutes = ['/', '/search-result', '/hotel-detail'];
  const bgColor = blueBgRoutes.includes(pathname) ? 'blue' : 'white';

  return !shouldHideHeader ? <Header bg={bgColor} /> : null;
};

export default HeaderWrapper;
