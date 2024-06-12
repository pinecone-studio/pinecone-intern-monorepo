'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const ModeToggle = () => {
  const { setTheme } = useTheme();

  const handleLightClick = () => {
    setTheme('light');
  };

  const handleDarkClick = () => {
    setTheme('dark');
  };

  const handleSystemClick = () => {
    setTheme('system');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLightClick}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDarkClick}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSystemClick}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
