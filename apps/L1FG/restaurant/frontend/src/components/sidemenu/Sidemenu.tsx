import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Home, ShoppingCart, User, FileText, Info, AlignJustify } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export const Sidemenu = () => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, []);

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  };

  const profile = () => {
    if (user) {
      window.location.href = '/userprofile';
    } else {
      toast.error('Нэвтэрч орно уу!');
      window.location.href = '/login';
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <span className="sr-only">Open Menu</span>
          <AlignJustify width={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex justify-between items-center">
          <SheetClose asChild></SheetClose>
        </SheetHeader>
        <nav role="menu" className="flex flex-col divide-y divide-gray-200">
          <Link href="/order/1" className="flex items-center gap-2 h-[68px]" role="menuitem">
            <Home size={20} /> <span>Нүүр хуудас</span>
          </Link>
          <Link href="/wallet" className="flex items-center gap-2 h-[68px]" role="menuitem">
            <ShoppingCart size={20} /> <span>Хэтэвч</span>
          </Link>
          <div role="button" data-testid="userButton" onClick={profile} className="flex items-center gap-2 h-[68px]">
            <User size={20} /> <span>Хэрэглэгч</span>
          </div>
          <Link href="/order-history" className="flex items-center gap-2 h-[68px]" role="menuitem">
            <FileText size={20} /> <span>Захиалгын түүх</span>
          </Link>
          <Link href="/about" className="flex items-center gap-2 h-[68px]" role="menuitem">
            <Info size={20} /> <span>Бидний тухай</span>
          </Link>
        </nav>
        <SheetFooter>
          <Button className="w-full bg-[#441500] text-white" onClick={logOut}>
            Гарах
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
