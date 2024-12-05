'use client';

import { useAdmin } from '@/components/providers/AdminProvider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

type DContainerProps = {
  name: string;
} & PropsWithChildren;
export const DetailsContainer = ({ children, name }: DContainerProps) => {
  const pathname = usePathname();
  const { addHotelForm } = useAdmin();
  const pathnames = (pathname ?? '').split('/').filter((path) => path);
  return (
    <div className="max-w-screen-xl m-auto">
      <form onSubmit={addHotelForm.handleSubmit}>
        <div className="py-4 flex justify-between">
          <div className="flex gap-4 items-center">
            <Link href={'/' + pathnames.slice(0, -1).join('/')}>
              <div className="bg-white w-8 h-8 text-black flex justify-center items-center rounded-md shadow-sm border hover:bg-gray-50">
                <ChevLeftIcon />
              </div>
            </Link>
            <span data-testid={`hotel-${name}`} className="text-lg font-semibold">
              {name}
            </span>
          </div>
          <div>
            <Button
              variant="outline"
              type="submit"
              className={`bg-blue-600 hover:opacity-50 text-white ${!addHotelForm.isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!addHotelForm.isValid || addHotelForm.isSubmitting}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="flex w-full gap-4 mb-4">{children}</div>
      </form>
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
