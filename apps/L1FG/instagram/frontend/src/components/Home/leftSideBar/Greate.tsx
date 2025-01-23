// components/Create.tsx
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SquarePlus, ImagePlay, BookOpenCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CreatePostStep1 } from '@/components/create-post/CreatePostStep1';
import { CreateStoryStep1 } from '@/components/story/createStory/CreateStoryStep1';

type Props = {
  searchOpen: boolean;
  isOpen: boolean;
};

export const Create = ({ searchOpen, isOpen }: Props) => {
  const [openCreatePostModal, setOpenCreatePostModal] = React.useState(false);
  const [openCreateStoryModal, setOpenCreateStoryModal] = React.useState(false);

  return (
    <div className="">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={`flex items-center gap-6 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px] w-full`}>
            <SquarePlus className="h-6 w-6" />
            <span className={`${isOpen || searchOpen ? 'hidden' : 'block'}`}>Create</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <Dialog open={openCreatePostModal} onOpenChange={setOpenCreatePostModal}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-between p-2 border rounded hover:bg-gray-100">
                  <span className="text-sm font-normal">Post</span>
                  <ImagePlay className="w-4 h-4 text-gray-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <CreatePostStep1 openCreatePostModal={openCreatePostModal} setOpenCreatePostModal={setOpenCreatePostModal} />
              </DialogContent>
            </Dialog>
            <Dialog open={openCreateStoryModal} onOpenChange={setOpenCreateStoryModal}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-between p-2 border rounded hover:bg-gray-100">
                  <span className="text-sm font-normal">Story</span>
                  <BookOpenCheck className="w-4 h-4 text-gray-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4 px-0">
                  <CreateStoryStep1 openCreateStoryModal={openCreateStoryModal} setOpenCreateStoryModal={setOpenCreateStoryModal} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
