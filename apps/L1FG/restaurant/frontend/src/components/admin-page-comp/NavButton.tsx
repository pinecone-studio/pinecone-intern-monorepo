'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}
const NavButton: React.FC<NavButtonProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <button
        className={`
        px-3 
        py-2 
        text-[14px] 
        font-medium 
        leading-[20px] 
        text-[#09090B]
        relative
        group
        transition-all
      `}
      >
        {children}
        <span
          data-testid="nav-button-underline"
          className={`
          absolute 
          bottom-0 
          left-0 
          w-full 
          h-[1px] 
          bg-[#09090B]
          transform
          origin-left
          transition-transform
          duration-300
          ${isActive ? 'scale-x-100' : 'scale-x-0'}
          group-hover:scale-x-100
        `}
        ></span>
      </button>
    </Link>
  );
};

export default NavButton;
