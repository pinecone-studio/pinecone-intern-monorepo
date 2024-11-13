'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BookOpenCheck, Image as LucidImage } from 'lucide-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

export const CreateDropDownMenu = () => {
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-fit focus:ring-0 h-6 p-0 font-light text-base text-black bg-white hover:bg-white">Create</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[154px]">
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
  );
};
