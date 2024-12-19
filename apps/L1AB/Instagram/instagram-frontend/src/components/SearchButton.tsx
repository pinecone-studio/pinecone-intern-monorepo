'use client';
import { AnimationControls, motion } from 'framer-motion';
import NavigationLink from './NavigationLink';
import { Search } from 'lucide-react';

interface SearchProps {
  isOpen: boolean;
  svgControls: AnimationControls;
  handleOpenClose: () => void;
}

export const SearchButton = ({ isOpen, svgControls, handleOpenClose }: SearchProps) => {
  return (
    <NavigationLink data-testid="searchButton" href={undefined} name={isOpen ? '' : 'Search'} onClick={() => handleOpenClose()}>
      <Search data-testid="search-click" className="min-w-6 min-w-6 group stroke-inherit stroke-[1.5] dark:stroke-white focus:stroke-[2.5]">
        <motion.path
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          animate={svgControls}
        />
      </Search>
    </NavigationLink>
  );
};
