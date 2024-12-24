'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BookOpenCheck, Image, SquarePlus } from 'lucide-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import NavigationLink from './NavigationLink';
import { AnimationControls, motion } from 'framer-motion';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CreatePost } from './CreatePost';
import { useState } from 'react';
import { CreateStory } from './CreateStory';

interface CreateProps {
  isOpen: boolean;
  svgControls: AnimationControls;
}

export const CreateButton = ({ svgControls, isOpen }: CreateProps) => {
  const [position, setPosition] = useState('bottom');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropDrownOpen, setIsDropDrownOpen] = useState(false);

  const handleOnChange = () => setIsDialogOpen(!isDialogOpen);

  const handleOnClick = () => {
    setIsDialogOpen(!isDialogOpen);
    setIsDropDrownOpen(false);
  };

  return (
    <div data-testid="create-button">
      <DropdownMenu open={isDropDrownOpen} data-testid="dropdown-menu">
        <DropdownMenuTrigger className="focus:ring-0 outline-none w-full rounded" data-cy="sidebar-btn-create-post">
          <NavigationLink href={undefined} name={isOpen ? '' : 'Create'} onClick={() => setIsDropDrownOpen(true)} data-testid="createPostButton">
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
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition} data-cy="navigation-link">
            <DropdownMenuItem className="outline-none rounded">
              <div data-cy="btn-create-post" data-testid="post-dialog0" className="hover:bg-gray-100 font-light rounded flex justify-between items-center px-2 cursor-pointer" onClick={handleOnClick}>
                <p>Post</p>
                <Image className="stroke-1 text-gray-500" size={20} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger className="w-full">
                <div className="flex gap-12 justify-between items-center px-2 py-1 hover:bg-gray-100 font-light rounded w-full">
                  <p>Story</p>
                  <BookOpenCheck className="stroke-1 text-gray-500" size={20} />
                </div>
              </DialogTrigger>
              <CreateStory />
            </Dialog>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreatePost isDialogOpen={isDialogOpen} onOpenChange={handleOnChange} />
    </div>
  );
};
