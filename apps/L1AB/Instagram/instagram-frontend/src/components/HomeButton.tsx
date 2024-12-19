'use client';

import { AnimationControls, motion } from 'framer-motion';
import NavigationLink from './NavigationLink';
import { House } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HomeProps {
  isOpen: boolean;
  svgControls: AnimationControls;
}
export const HomeButton = ({ isOpen, svgControls }: HomeProps) => {
  const pathname = usePathname();
  return (
    <NavigationLink href="/home" name={isOpen ? '' : 'Home'}>
      <House
        className={
          pathname == '/home' ? ' min-w-6 w-6 cursor-pointer dark:text-white  focus:stroke-[2.5] ' : 'stroke-inherit stroke-[1.5] min-w-6 w-6 dark:text-white cursor-pointer focus:stroke-[2.5]'
        }
        data-testid="home-click"
      >
        <motion.path
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          animate={svgControls}
        />
      </House>
    </NavigationLink>
  );
};
