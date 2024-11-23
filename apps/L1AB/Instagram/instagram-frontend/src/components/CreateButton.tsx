'use client';

import * as React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BookOpenCheck, Image as LucidImage, SquarePlus } from 'lucide-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import NavigationLink from './NavigationLink';
import { AnimationControls, motion } from 'framer-motion';

interface CreateProps {
  isOpen: boolean;
  svgControls: AnimationControls;
}
export const CreateButton = ({ svgControls, isOpen }: CreateProps) => {
  const [position, setPosition] = React.useState('bottom');
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:ring-0  outline-none w-full rounded">
          <NavigationLink href={undefined} name={isOpen ? '' : 'Create'}>
            <SquarePlus className="stroke-inherit stroke-[1.5] min-w-6 w-6 group ">
              <motion.path
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
                animate={svgControls}
              />
            </SquarePlus>
          </NavigationLink>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[154px] absolute left-0">
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuItem className="outline-none rounded">
              <div className="flex gap-12 justify-between items-center px-2 py-1 hover:bg-gray-100 font-light rounded">
                <p>Post</p>
                <LucidImage className="stroke-1 text-gray-500" size={20} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="outline-none rounded">
              <div className="flex gap-12 justify-between items-center px-2 py-1 hover:bg-gray-100 font-light rounded">
                <p>Story</p>
                <BookOpenCheck className="stroke-1 text-gray-500" size={20} />
              </div>
            </DropdownMenuItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
