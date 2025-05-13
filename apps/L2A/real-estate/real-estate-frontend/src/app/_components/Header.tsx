'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import * as React from "react" 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

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
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" width={24} height={24} className="object-contain" />
          <span className="font-bold">Home Vault</span>
        </div>

        <div className="flex gap-4 items-center">
          <Link href="/create" className="bg-orange-500 text-white px-4 py-1.5 rounded-md">
            + Зар оруулах
          </Link>

          {!loading && (
            <>
              {isLoggedIn ? (
                <>
                  <Link href="/my-listings">Миний зарууд</Link>
                  <span className="text-gray-600 text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">{user?.email}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" forceMount>
                        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem 
                          onClick={handleLogout}
                          className='text-red-500'
                          data-testid="logout-button"
                        >
                          Гарах
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </span>
                </>
              ) : (
                <>
                  <Link href="/signup">Бүртгүүлэх</Link>
                  <Link href="/signin">Нэвтрэх</Link>
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