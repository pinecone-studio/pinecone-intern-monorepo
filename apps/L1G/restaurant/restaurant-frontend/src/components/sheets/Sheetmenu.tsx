'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Info } from 'lucide-react';
import { User } from 'lucide-react';
import { Wallet } from 'lucide-react';
import { Home } from 'lucide-react';
import { List } from 'lucide-react';

export const SheetMenu = () => {
  const signOut = () => {
    localStorage.clear();
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={15} />
      </SheetTrigger>
      <SheetContent>
        <Menu className="absolute top-4" size={15} />
        <SheetTitle className="border-b pt-5"></SheetTitle>
        <SheetHeader className="flex flex-col justify-between h-full pb-4">
          <SheetDescription className="flex-col">
            <div className="flex gap-4 pl-3 items-center w-full h-[60px] border-b">
              <Home size={12} />
              <a href="/" className="font-[30px]">
                Нүүр хуудас
              </a>
            </div>
            <div className="flex gap-4 pl-3 items-center w-full h-[60px] border-b">
              <Wallet size={12} />
              <p className="font-[30px]">Хэтэвч</p>
            </div>
            <div className="flex gap-4 pl-3 items-center w-full h-[60px] border-b">
              <User size={12} />
              <p className="font-[30px]">Хэрэглэгч</p>
            </div>
            <a href="/history" className="flex gap-4 pl-3 items-center w-full h-[60px] border-b">
              <List size={12} />
              <p className="font-[30px]">Захиалгын түүх</p>
            </a>
            <div className="flex gap-4 pl-3 items-center w-full h-[60px] border-b">
              <Info size={12} />
              <a href="/about-us" className="font-[30px]">
                Бидний тухай
              </a>
            </div>
          </SheetDescription>
          <a href="/sign-in" onClick={() => signOut()} className="w-full bg-[#441500] text-white text-lg font-medium rounded-lg py-1">
            Гарах
          </a>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
