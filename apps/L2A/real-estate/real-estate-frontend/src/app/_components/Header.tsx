'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Header = () => {
  const { user, isLoggedIn, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    router.refresh();
  };

  return (
    <header className="border-b">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2 px-6">
        <motion.div className="flex items-start gap-2 cursor-pointer">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={24} height={24} className="object-contain" />
            <span className="font-bold hover:text-gray-500">Home Vault</span>
          </Link>
        </motion.div>

        <div className="flex gap-4 items-center">
            <Link href="/create-post" className="bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600">
              + Зар оруулах
            </Link>
          {!loading && (
            <>
              {isLoggedIn ? (
                <>
                  <Link href="/user-listing">Миний зарууд</Link>
                  <span className="text-gray-600 text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">{user?.email}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" forceMount>
                        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem onClick={handleLogout} className="text-red-500" data-testid="logout-button">
                          Гарах
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </span>
                </>
              ) : (
                <>
                  <motion.div className="flex items-start gap-2 cursor-pointer hover:text-gray-500">
                    <Link href="/signup">Бүртгүүлэх</Link>
                  </motion.div>
                  <motion.div className="flex items-start gap-2 cursor-pointer hover:text-gray-500">
                    <Link href="/signin">Нэвтрэх</Link>
                  </motion.div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
