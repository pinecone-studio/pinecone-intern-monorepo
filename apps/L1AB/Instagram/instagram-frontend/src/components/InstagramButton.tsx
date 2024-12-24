'use client';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { InstagramLogo } from './InstagramLogo';

interface InstagramProps {
  isOpen: boolean;
  // onClick: () => void;
}

export const InstagramButton = ({ isOpen }: InstagramProps) => {
  return (
    <button className="flex flex-row  cursor-pointer" data-testid="instagram-button">
      {isOpen ? (
        <div className=" hover:bg-gray-50 rounded flex justify-center items-center h-12 w-12 ">
          <motion.div className="flex justify-center items-center" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Instagram size={26} className="" />
          </motion.div>
        </div>
      ) : (
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <InstagramLogo />
        </motion.div>
      )}
    </button>
  );
};
