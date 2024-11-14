'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { FiColumns } from 'react-icons/fi';

export const Header = () => {
  const pathname = usePathname();
  const paths = ['Hotels', 'Hotel Details', 'Room Details', 'Guest Info'];
  const pathnames = (pathname ?? '').split('/').filter((path) => path);
  return (
    <div data-testid="header" className="min-h-16 border-y flex items-center">
      <div className="mr-4 ml-[22px]" data-testid="header-icon">
        <FiColumns className='w-4 h-4' />
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          {pathnames.map((_, index) => {
            const href = '/' + pathnames.slice(0, index + 1).join('/');
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={href}>{paths[index]}</BreadcrumbLink>
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
