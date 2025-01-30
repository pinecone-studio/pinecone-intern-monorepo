'use client';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useAuth } from '../providers/AuthProvider';

type Props = {
  icon: ReactNode;
  text: string;
  isOpen?: boolean;
  searchOpen?: boolean;
  onClick?: () => void;
};

export const TextSideBar = ({ icon, text, isOpen, searchOpen, onClick }: Props) => {
  const { user } = useAuth();

  return (
    <Link href={`/${user?._id}`}>
      <button
        data-testid="text-side-bar-id"
        onClick={onClick}
        className="w-full border-none flex items-center gap-6 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px]"
      >
        <div>{icon}</div>

        {!isOpen && !searchOpen && <p>{text}</p>}
      </button>
    </Link>
  );
};
