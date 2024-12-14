'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FaChevronLeft } from 'react-icons/fa6';
import { WiDaySunny } from 'react-icons/wi';
import { Switch } from '@mui/material';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

export const DarkMode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <WiDaySunny className="w-6 h-6" />
        Гадаад төрх солих
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-72 w-72">
        <DropdownMenuLabel>
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <FaChevronLeft className="w-3 text-slate-400" />
              <p className="font-semibold text-base">Гадаад төрх солих</p>
            </div>
            <WiDaySunny className="w-6 h-6" />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Button className="flex justify-between items-center w-full p-2 bg-white hover:bg-[#F4F4F5] text-black" aria-label="Харанхуй горим солих">
          <span className="pl-2">Харанхуй горим</span>
          <div className="flex items-center gap-2">
            {theme === 'dark' ? (
              <button data-testid="light" onClick={() => setTheme('light')} aria-label="Гэрэлтэй горим руу шилжих" className="p-1 rounded-full hover:bg-gray-200">
                <SunIcon />
              </button>
            ) : (
              <button data-testid="dark" onClick={() => setTheme('dark')} aria-label="Харанхуй горим руу шилжих" className="p-1 rounded-full hover:bg-gray-200">
                <MoonIcon />
              </button>
            )}
            <Switch checked={theme === 'dark'} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
          </div>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
