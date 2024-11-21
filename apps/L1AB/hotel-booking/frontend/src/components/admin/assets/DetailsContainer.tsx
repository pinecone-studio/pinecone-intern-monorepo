'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

type DContainerProps = {
  name: string;
} & PropsWithChildren;
export const DetailsContainer = ({ children, name }: DContainerProps) => {
  const pathname = usePathname();
  const pathnames = (pathname ?? '').split('/').filter((path) => path);
  return (
    <div className="max-w-screen-xl m-auto">
      <div className="py-4 flex gap-4 items-center">
        <Link href={'/' + pathnames.slice(0, -1).join('/')}>
          <div className="bg-white size-8 text-black flex justify-center items-center rounded-md shadow-sm border hover:bg-gray-50">
            <ChevLeftIcon />
          </div>
        </Link>
        <span className="text-lg font-semibold">{name}</span>
      </div>
      <div className="flex w-full gap-4 mb-4">{children}</div>
    </div>
  );
};
export const ChevLeftIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 12L6 8L10 4" stroke="#18181B" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
