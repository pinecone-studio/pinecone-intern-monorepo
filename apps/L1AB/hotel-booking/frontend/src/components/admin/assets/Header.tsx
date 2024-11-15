'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { HeaderIcon } from '@/components/icon';

export const Header = () => {
  const pathname = usePathname();
  const paths = ['Hotels', 'Hotel Details', 'Room Details', 'Guest Info'];
  const pathnames = (pathname ?? '').split('/').filter((path) => path);
  return (
    <div data-testid="header" className="h-16 flex items-center px-4 gap-2">
      <div data-testid="header-icon">
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
                  <BreadcrumbLink className={index === pathnames.length - 1 ? 'text-black' : ''} href={href}>
                    {paths[index]}
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
