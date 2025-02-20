import { useNightsCount } from '@/features/user/main/useNightsCount';
import { PriceDetail } from '../../hotel-detail';

interface SinglePageCardPriceProps {
  rooms: number;
}

export const SinglePageCardPrice = ({ rooms }: SinglePageCardPriceProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {}).format(price);
  };
  return (
    <div className="w-full">
      <div className="text-xs font-Inter font-normal leading-4 text-muted-foreground">Total</div>
      <div className="text-xl font-Inter font-medium leading-7">{formatPrice(rooms * useNightsCount())}₮</div>
      <div className="text-xs font-Inter font-normal leading-4 flex gap-1">
        <p className="font-Inter font-normal not-italic text-xs">{formatPrice(rooms)}₮</p>
        <p>Price per night</p>
      </div>
      <div className="w-full flex items-center justify-between">
        <PriceDetail price={rooms} />
        <button className="bg-[#2563EB] py-2 px-4 flex justify-center items-center rounded-md text-[#FAFAFA]">Reserve</button>
      </div>
    </div>
  );
};
