// components/Create.tsx
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SquarePlus, ImagePlay, BookOpenCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CreatePostStep1 } from '@/components/create-post/CreatePostStep1';

export const Create = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = React.useState(false);

  return (
    <div className="p-1 h-9 flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-4 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground ml-2 p-2">
            <SquarePlus className="h-4 w-4" />
            <span>Create</span>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-between p-2 border rounded hover:bg-gray-100">
                  <span className="text-sm font-normal">Story</span>
                  <BookOpenCheck className="w-4 h-4 text-gray-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">Story content here</div>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
