import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bell } from 'lucide-react';

export const SheetMenuNotif = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Bell size={15} />
      </SheetTrigger>
      <SheetContent>
        <Bell className="absolute top-4" size={18} />
        <SheetHeader>
          <SheetTitle className="border-b pt-5"></SheetTitle>
          <SheetDescription className="flex-col"></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
