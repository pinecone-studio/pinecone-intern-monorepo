'use client';

import { Mail, Phone, Headphones, Facebook, Youtube, Instagram } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
 
  return (
    <div className="w-full bg-white border-t">
      <footer className="px-4 sm:px-6 py-8 text-sm text-gray-700 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Image src="/logo.png" alt="logo" width={24} height={24} className="object-contain mb-2" />
              <div>
                <span className="text-base font-semibold">Home Vault</span>
                <p className="text-xs text-gray-500">© 2024 Booking Mongolia. All Rights Reserved.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <motion.div className="flex items-start gap-2 cursor-pointer">
                <Facebook className="w-4 h-4 cursor-pointer hover:text-[#1877F2]" />
              </motion.div>
              <motion.div className="flex items-start gap-2 cursor-pointer">
                <Youtube className="w-4 h-4 cursor-pointer hover:text-[#FF0000]" />
              </motion.div>
              <motion.div className="flex items-start gap-2 cursor-pointer">
                <Instagram className="w-4 h-4 cursor-pointer hover:text-[#C13584]" />
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <motion.div className="flex items-start gap-2 cursor-pointer hover:text-black">
              <Mail className="w-4 h-4 mt-0.5 hover:text-orange-500" />
              <div>
                <p className="font-medium">Email:</p>
                <p>support@pedia.mn</p>
              </div>
            </motion.div>
            <motion.div className="flex items-start gap-2 cursor-pointer hover:text-black">
              <Phone className="w-4 h-4 mt-0.5 hover:text-orange-500" />
              <div>
                <p className="font-medium">Phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </motion.div>
            <motion.div className="flex items-start gap-2 cursor-pointer hover:text-black">
              <Headphones className="w-4 h-4 mt-0.5 hover:text-orange-500" />
              <div>
                <p className="font-medium">Customer Support:</p>
                <p>Available 24/7</p>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
