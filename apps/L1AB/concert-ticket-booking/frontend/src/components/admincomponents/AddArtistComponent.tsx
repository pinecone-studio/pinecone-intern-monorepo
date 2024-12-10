'use client';
import { useState } from 'react';

import { DialogItem } from '@/components';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircleIcon } from 'lucide-react';

export const AddArtistComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [check, setCheck] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger className="flex self-stretch py-2 px-4 justify-center items-center gap-2 rounded-md bg-[#18181B] shadow-sm text-[#fff]" data-testid="Artist-DialogOpen">
        Артист Нэмэх
        <PlusCircleIcon />
      </DialogTrigger>
      <DialogContent className="flex max-w-[640px] p-9 flex-col items-start gap-4 border-[1px] border-[#E4E4E7] bg-[#fff] shadow-xs overflow-scroll  min-h-[320px]" data-testid="Artist-dialog-content">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Артист Нэмэх</DialogTitle>
        </DialogHeader>
        <DialogItem htmlFor="ArtistName" name="Артистын нэр">
          <Input placeholder="Нэр оруулах" name="ArtistName" />
        </DialogItem>
        <DialogItem htmlFor="description" name="Артистын тухай">
          <Textarea className="min-h-16" placeholder="Дэлгэрэнгүй мэдээлэл" name="description" />
        </DialogItem>
        <Button className="w-full" onClick={() => setCheck(!check)} data-testid="createArtistButton">
          Үүсгэх
        </Button>
      </DialogContent>
    </Dialog>
  );
};
