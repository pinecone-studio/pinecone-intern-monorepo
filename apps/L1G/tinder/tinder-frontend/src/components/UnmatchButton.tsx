'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const UnmatchButton = () => {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[112px] h-[40px] text-sm font-medium bg-white border hover:bg-gray-100">
          Unmatch
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Unmatch this person?</DialogTitle>
          <DialogDescription>If you unmatch, you will not be able to chat with this person again. This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-full hover:bg-[#E11D48E5] hover:text-white border" onClick={() => router.push('/chat')}>
              Keep match
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant="outline" className="rounded-full hover:bg-[#E11D48E5] hover:text-white border">
              Unmatch
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnmatchButton;
