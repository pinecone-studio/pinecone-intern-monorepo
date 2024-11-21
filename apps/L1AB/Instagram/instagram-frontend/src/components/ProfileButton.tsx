'use client';
import { AnimationControls, motion } from 'framer-motion';
import NavigationLink from './NavigationLink';
import { Annoyed } from 'lucide-react';
import Link from 'next/link';

interface ProfileProps {
  isOpen: boolean;
  svgControls: AnimationControls;
}
export const ProfileButton = ({ isOpen, svgControls }: ProfileProps) => {
  return (
    <Link href={'/profile'}>
      <NavigationLink name={isOpen ? '' : 'Profile'}>
        <Annoyed className="stroke-inherit stroke-[1.5] min-w-6 w-6 group">
          <motion.path
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            animate={svgControls}
          />
        </Annoyed>
      </NavigationLink>
    </Link>
  );
};
