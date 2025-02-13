import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Home, ShoppingCart, User, FileText, Info, AlignJustify } from 'lucide-react';
import Link from 'next/link';

export const Sidemenu = () => {
  const logOut = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <span className="sr-only">Open Menu</span>
          <AlignJustify width={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col ">
        <SheetHeader>
          <SheetClose asChild></SheetClose>
        </SheetHeader>
        <nav className="flex flex-col divide-y divide-gray-200">
          <Link href="/order/1" className="flex items-center gap-2 h-[68px]">
            <Home size={20} /> <span>Нүүр хуудас</span>
          </Link>
          <Link href="/wallet" className="flex items-center gap-2 h-[68px]">
            <ShoppingCart size={20} /> <span>Хэтэвч</span>
          </Link>
          <Link href="/userprofile" className="flex items-center gap-2 h-[68px]">
            <User size={20} /> <span>Хэрэглэгч</span>
          </Link>
          <Link href="/order-history" className="flex items-center gap-2 h-[68px]">
            <FileText size={20} /> <span>Захиалгын түүх</span>
          </Link>
          <Link href="/about" className="flex items-center gap-2 h-[68px]">
            <Info size={20} /> <span>Бидний тухай</span>
          </Link>
        </nav>
        <SheetFooter className="">
          <Button className="w-full bg-[#441500] text-white" onClick={() => logOut()}>
            Гарах
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
