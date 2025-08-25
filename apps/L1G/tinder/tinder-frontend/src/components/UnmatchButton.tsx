'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

const UnmatchButton = () => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="w-[112px] h-[40px] text-[14px] font-medium bg-white border hover:bg-gray-100">
        View Profile
      </Button>

      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="w-[112px] h-[40px] text-[14px] font-medium bg-white border hover:bg-gray-100">
            Unmatch
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>Unmatch this person?</DialogTitle>
            <DialogDescription>if you unmatch, you won’t be able to chat with this person again. This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" className="bg-white hover:bg-[#E11D48E5] rounded-full border text-black hover:text-white">
              Keep match
            </Button>
            <Button type="submit" className="bg-white hover:bg-[#E11D48E5] rounded-full border text-black hover:text-white">
              Unmatch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnmatchButton;
