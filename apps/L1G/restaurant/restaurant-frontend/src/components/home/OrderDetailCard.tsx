import { FoodOrder } from '@/generated';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

function shortPrice(price: number) {
  if (price >= 1000) {
    return `${(price / 1000).toFixed(3).replace(/\.?0+$/, '')}k`;
  }
  return `${price}`;
}

export const OrderDetailCard = ({ lastOrder }: { lastOrder: FoodOrder }) => (
  <div>
    {lastOrder ? (
      <div key={lastOrder?.orderId} data-testid={`order-details-last`} className="w-full h-[640px] overflow-scroll">
        <div className="border-b-[1px] pt-2 pb-2 gap-2 border-[#E4E4E7]">
          <p className="text-xs leading-[16px] font-medium text-[#8B8E95]">Захиалгын дугаар</p>
          <span className="text-base leading-[28px] text-[#09090B]">#{lastOrder?.orderNumber}</span>
        </div>
        <div className="border-b-[1px] pt-2 pb-2 gap-2 border-[#E4E4E7]">
          <p className="text-xs leading-[16px] font-medium text-[#8B8E95]">Захиалгын төлөв</p>
          <span className="text-base leading-[28px] text-[#09090B]">{lastOrder?.status}</span>
        </div>
        <div className="border-b-[1px] pt-2 pb-2 gap-2 border-[#E4E4E7]">
          <p className="text-xs leading-[16px] font-medium text-[#8B8E95]">Захиалсан огноо</p>
          <span className="text-base leading-[28px] text-[#09090B]">{format(new Date(Number(lastOrder?.createdAt)), 'yyyy/M/dd, HH:mm')}</span>
        </div>
        <div className="flex flex-col pt-2 pb-2 gap-2">
          <p className="text-xs leading-[16px] font-medium text-[#8B8E95]">Захиалга</p>

          <div className="flex flex-col gap-4 ">
            {lastOrder?.foodOrder.map((food) => (
              <div key={food.food?.foodId} className="flex border-b-[1px] gap-2 border-[#E4E4E7] bt-2 pb-2">
                <div className="relative flex w-[87px] h-[87px] rounded-lg">
                  <Image src={food?.food?.image as string} alt="image" priority sizes="auto" fill className="rounded-lg" />
                </div>
                <div className="flex flex-col gap-2 h-[87px]">
                  <p data-testid={`ordered-food-${food.food?.foodId}`} className="text-sm font-medium leading-[20px] text-[#09090B]">
                    {food?.food?.foodName}
                  </p>
                  <span className="text-lg font-bold leading-[20px] text-[#09090B]">{shortPrice(parseInt(food?.food?.price as string))}</span>
                  <Badge variant="outline" className="flex rounded-lg w-fit justify-center items-center text-sm font-medium leading-[16px] text-[#09090B]">
                    {food?.quantity}ш
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <></>
    )}
  </div>
);
