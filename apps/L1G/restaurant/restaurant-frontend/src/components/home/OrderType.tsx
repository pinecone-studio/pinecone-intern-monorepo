'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { CartItem } from '@/types/cart';
import { X } from 'lucide-react';
import { saveOrderData } from '@/utils/storage';
import { useState } from 'react';
import { FoodServeType } from '@/generated';

type Props = {
  isClicked: boolean;
};

const OrderType = ({ currentCart }: Props) => {
  const router = useRouter();

  const handlePick = (value: string) => {
    const v = value as FoodServeType;
    saveOrderData(currentCart, v);
    setTimeout(() => {
      router.push(`/orderPayment`);
    }, 0);
  };

  return (
    <Dialog open={isOpen}>
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
            <RadioGroupItem id="IN" value="IN" />
            <Label className="text-[14px]" htmlFor="IN">
              Эндээ идэх
            </Label>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <RadioGroupItem id="GO" value="GO" />
            <Label className="text-[14px]" htmlFor="GO">
              Аваад явах
            </Label>
          </div>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
};

export default OrderType;
