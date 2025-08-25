import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart } from 'lucide-react';

export const SheetMenuShop = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart size={15} />
      </SheetTrigger>
      <SheetContent>
        <ShoppingCart className="absolute top-4" size={15} />
        <SheetHeader>
          <SheetTitle className="border-b pt-5"></SheetTitle>
          <SheetDescription className="flex-col"></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
