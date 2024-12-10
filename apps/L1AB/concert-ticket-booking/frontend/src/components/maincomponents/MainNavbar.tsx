'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoDotFill } from 'react-icons/go';
import { LuSearch } from 'react-icons/lu';
import { Container } from './Container';
import { useGetMeQuery } from '@/generated';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const MainNavbar = () => {
  const pathname = usePathname();
  const token = localStorage.getItem('token');
  const { data } = useGetMeQuery();
  const { theme, setTheme } = useTheme();

  const paths = [
    {
      name: 'Бүртгүүлэх',
      path: '/signup',
    },
    {
      name: 'Нэвтрэх',
      path: '/signin',
    },
  ];
  return (
    <Container>
      <div className="py-6 px-12 flex justify-between border-b dark:border-[#27272A] border-[#c6c6c6] items-center" data-cy="Navbar-DarkMode">
        <Link href={`/`}>
          <div className="flex items-center ">
            <GoDotFill className="w-8 h-8 text-[#00B7F4] max-sm:w-5 max-sm:h-5" />
            <h1 className="font-semibold text-2xl max-sm:text-sm text-black dark:text-white">TICKET BOOKING</h1>
          </div>
        </Link>

        <div className="text-sm font-medium flex gap-4 items-center">
          <Link className="flex relative items-center text-sm " href={`/events`}>
            <LuSearch className="w-6 h-6 max-sm:w-5 max-sm:h-5 text-black dark:text-white" />
          </Link>
          {token ? (
            <Link href={'/profile'} className="max-sm:w-[80px]">
              <div className="text-black max-sm:w-full max-sm:truncate dark:text-white">{data?.getMe?.email}</div>
            </Link>
          ) : (
            <>
              {paths.map((path) => (
                <Link href={path.path} key={path.name} className={`${path.name === 'Бүртгүүлэх' ? 'max-sm:hidden max-md:hidden' : ''}`}>
                  <Button className={`py-2 px-10 rounded-md hover:bg-[#00B7F4] hover:text-black max-sm:px-2 max-sm:py-1 max-sm:text-sm ${pathname === path.path ? 'bg-[#00B7F4]' : ''}`}>
                    {path.name}
                  </Button>
                </Link>
              ))}
            </>
          )}
          <div >
            {theme === 'dark' ? (
              <button data-testid="light" onClick={() => setTheme('light')}>
                <SunIcon />
              </button>
            ) :  (
              <button data-testid="dark" onClick={() => setTheme('dark')}>
                <MoonIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
