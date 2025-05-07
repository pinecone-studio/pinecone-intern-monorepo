'use client';

import { Mail, Phone, Headphones, Facebook, Youtube, Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Footer = () => {
  const pathname = usePathname();

  const isAdmin = pathname === '/admin';

  return (
    <div className="w-full bg-white border-t">
      <footer className="px-4 sm:px-6 py-8 text-sm text-gray-700 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className={isAdmin ? 'flex flex-row items-center justify-between w-full' : ''}>
            <div className="flex items-center gap-2 mb-1">
              <Image src="/logo.png" alt="logo" width={24} height={24} className="object-contain" />
              <span className="text-base font-semibold">Home Vault</span>
            </div>
            <p className="text-xs text-gray-500">© 2024 Booking Mongolia. All Rights Reserved.</p>
            {!isAdmin && (
              <div className="flex gap-3 mt-3">
                <Facebook className="w-4 h-4" />
                <Youtube className="w-4 h-4" />
                <Instagram className="w-4 h-4" />
              </div>
            )}
          </div>
          {!isAdmin && (
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5" />
                <div>
                  <p className="font-medium">Email:</p>
                  <p>support@pedia.mn</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5" />
                <div>
                  <p className="font-medium">Phone:</p>
                  <p>+976 (11) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Headphones className="w-4 h-4 mt-0.5" />
                <div>
                  <p className="font-medium">Customer Support:</p>
                  <p>Available 24/7</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
export default Footer;
