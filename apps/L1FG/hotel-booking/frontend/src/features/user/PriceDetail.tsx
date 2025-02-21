import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useNightsCount } from '@/features/user/main/useNightsCount';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Room } from '@/generated';

interface SinglePageCardPriceProps {
  rooms: Room | null | undefined;
}

export const PriceDetail = ({ rooms }: SinglePageCardPriceProps) => {

  const router = useRouter();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {}).format(price);
  };
  const price = rooms?.price || 0
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 py-2">
          <p className="text-sm font-medium leading-5 text-[#2563EB]">Price Detail</p>
          <ChevronRight width={16} height={16} color="#2563EB" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[626px]">
        <div className="font-semibold font-Inter text-xl tracking-[-0.5px]">Price Detail</div>

        <div className="flex flex-col space-x-2">
          <div className=" flex justify-between">
            <div className="w-[130px] flex flex-col gap-1">
              <p className="text-sm font-normal not-italic font-Inter text-[#18181B]">{useNightsCount()} night</p>
              <p className="text-sm font-normal not-italic font-Inter text-[#71717A]">₮ {formatPrice(price)} per night</p>
            </div>
            <p className="text-sm font-medium not-italic font-Inter text-[#18181B]">₮ {formatPrice(price * useNightsCount())}</p>
          </div>
          <div className="h-[33px] mb-6  border-b border-b-[#E4E4E7]"></div>
          <div className="flex justify-between">
            <p className="text-sm font-medium not-italic font-Inter">Total price</p>
            <p className="text-xl font-medium not-italic font-Inter">₮ {formatPrice(price * useNightsCount())}</p>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <button onClick={() => {
    if (rooms?.id) {
      router.push(`/check-out/${rooms.id}`);
    }
  }}  className="w-full bg-[#2563EB] px-3 py-2 rounded-md text-white text-ms font-medium not-italic" type="button">
              Reserve
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
