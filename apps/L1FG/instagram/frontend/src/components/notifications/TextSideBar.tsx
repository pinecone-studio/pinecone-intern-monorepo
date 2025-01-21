import { ReactNode } from 'react';
import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

type Props = {
  icon: ReactNode;
  text: string;
  isOpen?: boolean;
  onclick?: () => void;
  className?: string;
};

export const TextSideBar = ({ icon, text, isOpen, onclick, className }: Props) => {
  return (
    <button
      data-testid="text-side-bar-id"
      onClick={onclick}
      className={cn(`${isOpen ? 'h-12 w-12' : ''}flex items-center gap-6 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px]`)}
    >
      <div className={cn(`${isOpen ? 'fill-black' : 'fill-none'}`, className)}>{icon}</div>
      <p className={`${isOpen ? 'hidden' : 'block'}`}>{text}</p>
    </button>
  );
};
