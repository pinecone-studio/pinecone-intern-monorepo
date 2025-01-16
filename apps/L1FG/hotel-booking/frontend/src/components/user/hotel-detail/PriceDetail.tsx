import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';

export const PriceDetail = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Price Detail</Button>
      </DialogTrigger>
      <DialogContent className="w-[626px]">
        <div className="text-[20px] leading-[28px] font-[600]">Price Detail</div>

        <div className="flex flex-col space-x-2">
          <div className=" flex justify-between">
            <div className="w-[130px] flex flex-col gap-1">
              <p className="text-[14px] leading-[20px] font-[500] text-[#18181B]">2 night</p>
              <p className="text-[14px] leading-[20px] font-[500] text-[#71717A]">T 75,000 per night</p>
            </div>
            <p className="text-[14px] leading-[20px] font-[500] text-[#18181B]">T 150,000</p>
          </div>
          <div className="h-[33px] mb-6  border-b border-b-[#E4E4E7]"></div>
          <div className="flex justify-between">
            <p className="text-[14px] leading-[20px] font-[500]">Total price</p>
            <p className="text-[14px] leading-[20px] font-[500]">T 300,000</p>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button className="w-full bg-[#2563EB] text-white text-[14px] leading-[20px] font-[500]" type="button" variant="secondary">
              Reserve
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
