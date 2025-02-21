import { useNightsCount } from '@/features/user/main/useNightsCount';
import { PriceDetail } from '../../hotel-detail';
import { Room } from '@/generated';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

interface SinglePageCardPriceProps {
  rooms: Room | null | undefined;
}

export const SinglePageCardPrice = ({ rooms }: SinglePageCardPriceProps) => {
  const router = useRouter();
  const [adult] = useQueryState('bedcount');
  const [dateFrom] = useQueryState('dateFrom');
  const [dateTo] = useQueryState('dateTo');
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {}).format(price);
  };

  const price = rooms?.price || 0;
  return (
    <div className="w-full">
      <div className="text-xs font-Inter font-normal leading-4 text-muted-foreground">Total</div>
      <div className="text-xl font-Inter font-medium leading-7">{formatPrice(price * (useNightsCount() || 1))}₮</div>
      <div className="text-xs font-Inter font-normal leading-4 flex gap-1">
        <p className="font-Inter font-normal not-italic text-xs">{formatPrice(price)}₮</p>
        <p>Price per night</p>
      </div>
      <div className="w-full flex items-center justify-between">
        <PriceDetail rooms={rooms} />
        <button onClick={() => router.push(`/check-out/${rooms?.id}?bedcount=${adult}&dateFrom=${dateFrom}&dateTo=${dateTo}`)} className="bg-[#2563EB] py-2 px-4 flex justify-center items-center rounded-md text-[#FAFAFA]">Reserve</button>
      </div>
    </div>
  );
};
