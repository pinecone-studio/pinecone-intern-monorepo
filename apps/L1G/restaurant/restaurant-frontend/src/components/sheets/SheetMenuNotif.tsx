import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bell } from 'lucide-react';
import { BellRing } from 'lucide-react';

export const SheetMenuNotif = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Bell size={15} />
      </SheetTrigger>
      <SheetContent>
        <Bell className="absolute top-4" size={18} />
        <SheetHeader>
          <SheetTitle className="border-b w-full pt-5"></SheetTitle>
          <SheetDescription className="flex-col"></SheetDescription>
        </SheetHeader>
        <div className="w-full">
          <p className="text-[#441500]">Мэдэгдэл</p>
          <div className="w-full h-[80px] rounded-md border-gray-300 border-[1px]">
            <div className="flex w-full  gap-2 pt-2 pl-4">
              <div className="w-[30px] h-[30px] bg-gray-300 rounded-full flex justify-center items-center ">
                <BellRing size={15} />
              </div>
              <p className="text-[12px] text-gray-600">#32193  Таны захиалсан хоол баталгаажлаа.</p>
              <div></div>
            </div>
            <div className="flex justify-end items-center gap-5">
              <div className="w-[100px] h-[20px] rounded-md flex items-center  justify-center border-[1px] border-gray-400 ">
                <p className="text-[13px]">Pending</p>
              </div>
              <p className="text-[10px] pr-2">24.10.19 15:25</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
