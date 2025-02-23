import { HotelCard } from './HotelCard';
import { Hotel } from '@/generated';
import { SelectInput } from '@/features/user/search-result/SelectInput';
import { LucideHotel } from 'lucide-react';
import { SkeletonCard } from '../ui/cards';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

interface RightNavbarProps {
  data: Array<Hotel | null>;
  setSearchValuePrice: (_: 'asc' | 'desc') => void;
  isLoading: boolean;
}

export const RightNavbar = ({ data, setSearchValuePrice, isLoading }: RightNavbarProps) => {
  const [adult] = useQueryState('bedcount');
  const [dateFrom] = useQueryState('dateFrom');
  const [dateTo] = useQueryState('dateTo');
  const router = useRouter();
  return (
    <div className="w-[872px] flex flex-col gap-4" data-testid="right-navbar">
      <div className="flex justify-between">
        <p className="font-Inter not-italic text-[14px] leading-[20px] font-500" data-testid="property-count">
          {data.length} properties
        </p>

        <div className="flex flex-col space-y-8 w-72" data-testid="select-container">
          <div className="space-y-2" data-testid="select-wrapper">
            <SelectInput setSearchValuePrice={setSearchValuePrice} />
          </div>
        </div>
      </div>
      {isLoading ? (
        <>
          <SkeletonCard data-testid="skeleton-card-1" />
          <SkeletonCard data-testid="skeleton-card-2" />
          <SkeletonCard data-testid="skeleton-card-3" />
        </>
      ) : data && data.length > 0 ? (
        data.map((hotelData) => (
          <button
            key={hotelData?.id}
            onClick={() => router.push(dateFrom && dateTo ? `/hotel-detail/${hotelData?.id}?bedcount=${adult}&dateFrom=${dateFrom}&dateTo=${dateTo}` : `/hotel-detail/${hotelData?.id}`)}
          >
            <HotelCard data={hotelData} data-testid={`hotel-card-${hotelData?.id}`} />
          </button>
        ))
      ) : (
        <div className="w-full h-full flex justify-center py-16">
          <div className="flex flex-col gap-1 items-center">
            <LucideHotel size={40} color="#71717A" />
            <p className="font-Inter font-semibold not-italic text-lg text-[#71717A]">Not found hotel</p>
          </div>
        </div>
      )}
    </div>
  );
};
