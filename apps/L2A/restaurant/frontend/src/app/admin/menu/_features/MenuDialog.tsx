'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const MenuDialog = () => {
  return (
    <div className="flex items-center gap-2" data-testid="food-actions">
      <Dialog>
        <DialogTrigger asChild>
          <Button data-testid="discount-trigger" className="flex items-center text-black text-[16px] gap-2 bg-muted py-2 px-4 rounded-lg cursor-pointer hover:bg-muted/80 border">
            Хямдрал
            <Plus className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DialogTrigger>

        <DialogContent data-testid="edit-dialog">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Хямдрал нэмэх</DialogTitle>
            <DialogDescription className="flex flex-col">
              <Input type="text" placeholder="Хямдралын нэр" className="w-[291px] mt-4" />
              <Input type="text" placeholder="Хямдралын хувь" className="w-[291px] mt-4" />
            </DialogDescription>
            <Button className="w-[291px]" data-testid="edit-submit">
              Нэмэх
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button data-testid="menu-trigger" className="flex items-center text-black text-[16px] gap-2 bg-muted py-2 px-4 rounded-lg cursor-pointer hover:bg-muted/80 border">
            Цэс
            <Plus className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DialogTrigger>

        <DialogContent data-testid="menu-dialog">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Цэсэнд нэмэх</DialogTitle>
            <DialogDescription>
              <Input type="text" placeholder="Бүтээгдэхүүн нэмэх" className="w-[291px] mt-2 mb-3" />
            </DialogDescription>
            <Button className="w-[291px]" data-testid="menu-submit">
              Нэмэх
            </Button>
          </DialogHeader>
        </DialogContent>

      </Dialog>
    </div>
  );
};

export default MenuDialog;