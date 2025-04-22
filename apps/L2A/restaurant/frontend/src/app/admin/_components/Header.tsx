'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';

const AdminHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const menuItems = ["Захиалга", "Төсөв", "Хоол", "Ширээ"];

  const renderDesktopNavItem = (item: string, index: number) => (
    <p
      key={index}
      onClick={() => setActiveIndex(index)}
      className={` text-lg
        cursor-pointer relative hidden md:block
        after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:transition-all after:duration-150
        ${activeIndex === index ? 'after:bg-black' : 'after:bg-transparent hover:after:bg-black'}
      `}
    >
      {item}
    </p>
  );

  const renderMobileNavItem = (item: string, index: number) => (
    <p
      key={index}
      className="
        cursor-pointer text-center md:hidden
        relative after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:-bottom-1 after:h-[1px] after:w-full after:transition-all after:duration-150
        hover:after:bg-black after:bg-transparent
      "
    >
      {item}
    </p>
  );

  return (
    <header className="w-full shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {menuItems.map(renderDesktopNavItem)}
        </nav>
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hidden md:block">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden px-6 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <>
              <nav className="flex flex-col h-36 items-center gap-4 text-sm font-medium overflow-hidden">
                {menuItems.map(renderMobileNavItem)}
              </nav>
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AdminHeader;
