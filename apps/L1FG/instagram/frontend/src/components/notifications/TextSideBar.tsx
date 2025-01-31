'use client';
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  text: string;
  isOpen?: boolean;
  searchOpen?: boolean;
  onclick?: () => void;
};

export const TextSideBar = ({ icon, text, onclick, isOpen }: Props) => {
  return (
    <div
      data-testid="text-side-bar-id"
      onClick={onclick}
      className={`flex items-center gap-6 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px]
        w-full`}
    >
      {icon}
      {isOpen && text}
    </div>
  );
};
