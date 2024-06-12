'use client';

import Link from 'next/link';
import { LogoOnly } from './Logo';
import { ModeToggle } from './ModeToggle';

export const ProjectHeader = () => {
  return (
    <>
      <div className="border-b bg-background">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center flex-start ">
              <Link href={'/'}>
                <LogoOnly />
              </Link>
            </div>
            <div className="flex space-x-4 flex-end">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
