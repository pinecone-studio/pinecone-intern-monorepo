'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { HeaderIcon } from '@/components/icon';

export const Header = () => {
  const pathname = usePathname();
  const Hotelpaths = ['Hotels', 'Hotel Details', 'Room Details', 'Guest Info'];
  const GuestPaths = ['Guests', 'Guest Info'];
  const pathnames = pathname
    .replace('/admin', '')
    .split('/')
    .filter((path) => path);

  return (
    <div data-testid="header" className="h-16 flex items-center px-4 gap-2">
      <div>
        <HeaderIcon />
      </div>
      <div className="h-4 border-l mr-2"></div>
      <Breadcrumb>
        <BreadcrumbList>
          {pathnames.map((_, index) => {
            const href = '/' + pathnames.slice(0, index + 1).join('/');
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink className={index === pathnames.length - 1 ? 'text-black' : ''} href={'/admin' + href}>
                    {href.startsWith('/hotels') ? Hotelpaths[index] : href.startsWith('/guests') ? GuestPaths[index] : ''}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < pathnames.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
