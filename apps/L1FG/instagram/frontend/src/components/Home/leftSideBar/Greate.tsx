import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SquarePlus, ImagePlay } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { BookOpenCheck } from 'lucide-react';

const Greate = () => {
  return (
    <div className="p-1 h-9 flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-4 overflow-hidden rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground ml-2 p-2">
            <SquarePlus />
            <p> Create</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">


            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-between p-2 border rounded hover:bg-gray-100">
                  <p className="text-[var(--text-text-foreground,#09090B)] font-inter text-sm font-normal leading-[1.42857]">Post</p>
                  <ImagePlay className="w-4 h-4 mr-2 text-gray-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>header</DialogHeader>
                <div className="grid gap-4 py-4">body</div>
                <DialogFooter>footer</DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-between p-2 border rounded hover:bg-gray-100">
                  <p className="text-[var(--text-text-foreground,#09090B)] font-inter text-sm font-normal leading-[1.42857]">Story</p>
                  <BookOpenCheck className="w-4 h-4 mr-2 text-gray-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>header</DialogHeader>
                <div className="grid gap-4 py-4">body</div>
                <DialogFooter>footer</DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Greate;
