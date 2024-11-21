'use client';

import { AnimationControls, motion } from 'framer-motion';
import NavigationLink from './NavigationLink';
import { House } from 'lucide-react';
import Link from 'next/link';

interface HomeProps {
  isOpen: boolean;
  svgControls: AnimationControls;
}
export const HomeButton = ({ isOpen, svgControls }: HomeProps) => (
  <Link href={'/home'}>
    <NavigationLink name={isOpen ? '' : 'Home'}>
      <House className="stroke-inherit stroke-[1.5] min-w-6 w-6 cursor-pointer focus:stroke-[2.5]" data-testid="home-click">
        <motion.path
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          animate={svgControls}
        />
      </House>
    </NavigationLink>
  </Link>
);
