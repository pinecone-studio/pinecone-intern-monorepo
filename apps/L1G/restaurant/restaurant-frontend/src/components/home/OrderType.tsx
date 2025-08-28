'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { CartItem } from '@/types/cart';
import type { OrderTypeValue } from '@/types/order';
import { X } from 'lucide-react';
import { saveOrderData } from '@/utils/storage';

type Props = {
  currentCart: CartItem[];
};

const OrderType = ({ currentCart }: Props) => {
  const router = useRouter();

  const handlePick = (value: string) => {
    const v = value as OrderTypeValue;
    saveOrderData(currentCart, v);
    setTimeout(() => {
      router.push(`/orderPayment?type=${v}`);
    }, 0);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full bg-amber-800 hover:bg-amber-900 text-white py-4 text-lg font-medium rounded-lg">Захиалах</DialogTrigger>
      <DialogContent className="sm:max-w-[420px] border-[2px] border-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-[18px]">
            <DialogClose className="flex w-full justify-between">
              <p>Зааланд суух эсэх</p>
              <X className="h-5 w-5 -right-4 -top-4" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <RadioGroup onValueChange={handlePick} className="flex items-center w-full justify-around mt-4 mb-8">
          <div className="flex items-center justify-center space-x-3">
            <RadioGroupItem id="dinein" value="dine_in" />
            <Label className="text-[14px]" htmlFor="dinein">
              Эндээ идэх
            </Label>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <RadioGroupItem id="takeaway" value="takeaway" />
            <Label className="text-[14px]" htmlFor="takeaway">
              Аваад явах
            </Label>
          </div>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
};

export default OrderType;
