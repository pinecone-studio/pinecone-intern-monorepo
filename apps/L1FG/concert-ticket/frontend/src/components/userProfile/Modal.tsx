'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPassword } from './Password';
import { OrderHistory } from './OrderHisto';

export const Modal = ({ orderData }: { orderData: string }) => {
  return (
    <div className="flex flex-col gap-6">
      {orderData === 'order' && (
        <div className="bg-[#131313] p-8 flex flex-col gap-6 rounded-lg">
          <div className="grid w-full  items-center gap-2">
            <Label htmlFor="email" className="text-white w-[777px] font-thin text-base mb-2">
              Утасны дугаар:
            </Label>
            <Input className="bg-[#131313]  w-[777px] border-stone-600 text-white" type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="email" className=" text-white font-thin text-base mb-2">
              Имэйл хаяг:
            </Label>
            <Input type="email" id="email" placeholder="Email" className="w-[777px] bg-[#09090B] border-stone-600  text-white" />
          </div>
          <div className="text-end">
            <Button className="w-fit bg-[#00B7F4] text-black">Хадгалах</Button>
          </div>
        </div>
      )}
      <div>
        {orderData === 'data' && <OrderHistory></OrderHistory>}
        {orderData === 'pass' && <UserPassword></UserPassword>}
      </div>
    </div>
  );
};
