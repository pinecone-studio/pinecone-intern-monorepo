'use client';

import { AnimationControls, motion } from 'framer-motion';
import NavigationLink from './NavigationLink';
import { House } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HomeProps {
  isOpen: boolean;
  svgControls: AnimationControls;
  style?: React.CSSProperties;
}
export const HomeButton = ({ isOpen, svgControls }: HomeProps) => {
  const pathname = usePathname();
  return (
    <div
      className={
        pathname == '/home'
          ? 'group h-[50px] flex  rounded-md cursor-pointer   hover:stroke-neutral-500 stroke-neutral-800  dark:bg-black dark:stroke-neutral-800 hover:bg-gray-100 hover:border  hover:border-gray-300 place-items-center  gap-3 transition-colors duration-1000  text-[#09090B] font-light '
          : 'group h-12 py-3 w-full items-center flex rounded   dark:bg-black cursor-pointer stroke-[0.75] hover:stroke-neutral-500 stroke-neutral-800  hover:bg-gray-100 place-items-center gap-3 transition-colors duration-1000 hover:border-0 text-[#09090B] font-bold'
      }
    >
      <NavigationLink href="/home" name={isOpen ? '' : 'Home'}>
        <House data-testid="home-click" className="stroke-inherit  dark:stroke-white  min-w-6 min-h-6 group">
          <motion.path
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            animate={svgControls}
          />
        </House>
      </NavigationLink>
    </div>
  );
};
