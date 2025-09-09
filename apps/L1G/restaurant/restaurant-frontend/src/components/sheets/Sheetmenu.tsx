'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Info, User, Wallet, Home, List } from 'lucide-react';

const logout = () => {
  localStorage.clear();
};

export const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={15} />
      </SheetTrigger>
      <SheetContent className="h-full">
        <Menu className="top-4" size={15} />
        <SheetHeader className="h-full flex flex-col">
          <SheetTitle className="border-b pt-5"></SheetTitle>
          <SheetDescription className="flex flex-col justify-between h-full">
            {/* --- Дээд navigation хэсэг --- */}
            <div>
              <div className="flex gap-4 pl-3 items-center w-full h-[60px] border-b">
                <Home size={12} />
                <a href="/" className="font-[30px]">
                  Нүүр хуудас
                </a>
              </div>
              <a href="/wallet" className="flex gap-4 pl-3 items-center w-full h-[60px] border-b">
                <Wallet size={12} />
                <p className="font-[30px]">Хэтэвч</p>
              </a>
              <div className="flex gap-4 pl-3 items-center w-full h-[60px] border-b">
                <User size={12} />
                <a href="/update-user" className="font-[30px]">
                  Хэрэглэгч
                </a>
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
            </div>

            {/* --- Доод талын Logout --- */}

            <div className="flex justify-center pb-4">
              <a data-testid="logout-button" onClick={() => logout()} href="/sign-in" className="w-[300px] h-[40px] bg-[#441500] flex items-center justify-center rounded-md">
                <p className="text-white">Гарах</p>
              </a>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
