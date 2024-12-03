'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateBookingEverythingMutation } from '@/generated';
import { useState } from 'react';
interface UserHistoryDialogProps {
  bookingId: string;
}
export const UserHistoryDialog = ({ bookingId }: UserHistoryDialogProps) => {
  const [updateBooking] = useUpdateBookingEverythingMutation();
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState<number>();
  const handleUpdateBooking = async () => {
    await updateBooking({
      variables: {
        input: { _id: bookingId as string, status: 'Цуцлах хүсэлт илгээсэн', bankName, bankAccount },
      },
    });
  };
  return (
    <div data-testid="dis-btn ">
      <Dialog>
        <DialogTrigger asChild data-testid="select">
          <div className="text-sm font-medium px-3 py-2 bg-[#27272A] rounded-md hover:bg-[#00B7F4] hover:text-black cursor-pointer">Цуцлах</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[462px] border-[#27272A] p-6 bg-black max-sm:w-full max-sm:px-3">
          <DialogHeader className="flex flex-col gap-1 ">
            <div className="flex justify-between">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-white text-lg font-semibold">Тасалбар цуцлах</DialogTitle>
              </div>
              <DialogClose asChild className="text-white ">
                <p className="cursor-pointer text-lg">X</p>
              </DialogClose>
            </div>
            <DialogDescription className="text-base font-normal">#{bookingId} тасалбараа цуцлахдаа итгэлтэй байна уу?</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4 justify-end text-base font-medium">
              <Label className="text-right text-white">Банк </Label>
              <Select data-cy="Profile-Select-Input" onValueChange={(value) => setBankName(value)}>
                <SelectTrigger className="w-[304px] text-white border-[#27272A]" data-testid="bankName-select">
                  <SelectValue placeholder="Сонгох" />
                </SelectTrigger>
                <SelectContent className="text-white bg-black border-[#27272A]">
                  <SelectGroup>
                    <SelectItem data-testid="option" value="Хаан банк">
                      Хаан банк
                    </SelectItem>
                    <SelectItem value="Голомт банк">Голомт банк</SelectItem>
                    <SelectItem value="Хас банк">Хас банк</SelectItem>
                    <SelectItem value="Төрийн банк">Төрийн банк</SelectItem>
                    <SelectItem value="Худалдаа хөгжлийн банк">Худалдаа хөгжлийн банк</SelectItem>
                    <SelectItem value="М банк">М банк</SelectItem>
                    <SelectItem value="Капитрон банк">Капитрон банк</SelectItem>
                    <SelectItem value="Тээвэр хөгжлийн банк">Тээвэр хөгжлийн банк</SelectItem>
                    <SelectItem value="Ариг банк">Ариг банк</SelectItem>
                    <SelectItem value="Үндэсний хөрөнгө оруулалтын банк">Үндэсний хөрөнгө оруулалтын банк</SelectItem>
                    <SelectItem value="Чингис Хаан банк">Чингис Хаан банк</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 text-white ">
              <Label htmlFor="name" className="text-right">
                Дансны №
              </Label>
              <input
                value={bankAccount}
                data-testid="NumberInput"
                onChange={(e) => setBankAccount(Number(e.target.value))}
                type="number"
                placeholder="Дансны дугаар"
                className="text-[#A1A1AA] col-span-3 border-[#27272A]"
                data-cy="Profile-Account-Input"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 text-white">
              <Label htmlFor="username" className="text-right">
                Нэр
              </Label>
              <input type="text" placeholder="Эзэмшигчийн нэр" className="col-span-3 text-[#A1A1AA] border-[#27272A]" data-cy="Profile-User-Name-Input" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button
                type="submit"
                className="bg-[#18181a] hover:bg-[#00B7F4] hover:text-black px-4 py-3"
                data-cy="Profile-Submit-Button"
                data-testid="end"
                onClick={() => {
                  handleUpdateBooking();
                }}
              >
                Цуцлах хүсэлт илгээх
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
