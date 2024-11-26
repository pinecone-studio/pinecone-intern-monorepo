'use client ';

import { Annoyed, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const variants = {
  close: {
    x: -491,
    opacity: 0,
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
};

interface SearchProps {
  isOpen: boolean;
  toggleSearchDrawer: () => void;
}
export const SearchDrawer = ({ isOpen }: SearchProps) => {
  return (
    <>
      <motion.nav
        data-testid="search-drawer"
        variants={variants}
        initial="close"
        animate={isOpen ? 'open' : 'close'}
        exit="close"
        transition={{ type: 'spring', damping: 15, duration: 0.5 }}
        className={`drawer fixed space-y-5 w-[411px] bg-white z-20 h-full left-[80px] py-6 px-4 transition-transform duration-100 shadow shadow-neutral-200 ${
          isOpen ? 'translate-x-[-411px]' : 'translate-x-0'
        }`}
      >
        <h1 className="font-semibold text-2xl">Search</h1>
        <div className="space-y-5 divide-y divide-slate-300">
          <div className="relative  w-full  border-gray-100 rounded-lg h-12 flex p-4 text-gray-500 gap-4">
            <Search size={16} />
            <input type="search" placeholder="Search..." className="bg-transparent  outline-none font-light"></input>
          </div>
          <div className=" space-y-4 pt-4">
            <div className="flex justify-between">
              <span>Recent</span>
              <span className="text-blue-500">Clear all</span>
            </div>
            <div className="h-[44px] w-full bg-white flex gap-2">
              <div className="h-full w-[48px] border">
                <Annoyed />
              </div>

              <div>
                <p>name</p>
                <p className="text-xs text-gray-500">r o s e t t a ‘s b e s t l i f e 💕• Followed by elizabeth</p>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};
