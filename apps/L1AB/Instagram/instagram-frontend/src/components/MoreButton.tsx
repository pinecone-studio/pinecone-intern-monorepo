'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bookmark, Menu, Settings, ShieldAlert, SquareActivity } from 'lucide-react';
import NavigationLink from './NavigationLink';
import { AnimationControls, motion } from 'framer-motion';
import LogoutDialog from './LogoutButton';
import { DarkMode } from './DarkMode';

interface MenuProps {
  isOpen: boolean;
  svgControls: AnimationControls;
}

export const MoreButton = ({ isOpen, svgControls }: MenuProps) => {
  return (
    <div className="dark:bg-black">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:ring-0  outline-none w-full dark:bg-black">
          <NavigationLink href={undefined} name={isOpen ? '' : 'More'}>
            <Menu className="dark:stroke-white">
              <motion.path
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
                animate={svgControls}
              />
            </Menu>
          </NavigationLink>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute bottom-16  w-[220px] left-0 font-light p-2">
          <DropdownMenuItem className=" flex gap-2 h-12">
            <Settings size={18} />
            <span> Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2 h-12">
            <SquareActivity size={18} />
            <span>Your activity</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2 h-12">
            <Bookmark size={18} />
            <span>Switch appearance</span>
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2 h-12">
            <DarkMode />
          </DropdownMenuItem>
          <DropdownMenuItem className=" flex gap-2 h-12">
            <ShieldAlert size={18} />
            <span>Report a problem</span>
          </DropdownMenuItem>
          <div className="border my-1"></div>
          <DropdownMenuItem className="  h-12">Switch account</DropdownMenuItem>
          <DropdownMenuSeparator className="text-gray-700" />
          <DropdownMenuItem>
            <LogoutDialog buttonClassName=" !py-2 !font-light !bg-transparent !text-black !w-full !flex !justify-start !text-[14px] " />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
