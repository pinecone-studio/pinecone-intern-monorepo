'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

const UnmatchButton = () => {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[112px] h-[40px] text-[14px] font-medium bg-white border hover:bg-gray-100">
          Unmatch
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Unmatch this person?</DialogTitle>
          <DialogDescription>If you unmatch, you won’t be able to chat with this person again. This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between gap-2">
          <DialogClose asChild>
            <button onClick={() => router.push('/chat')} className="bg-white border rounded-full text-black hover:bg-[#E11D48E5] hover:text-white px-4 py-2">
              Keep match
            </button>
          </DialogClose>

          <DialogClose asChild>
            <button className="bg-white border rounded-full text-black hover:bg-[#E11D48E5] hover:text-white px-4 py-2">Unmatch</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnmatchButton;
