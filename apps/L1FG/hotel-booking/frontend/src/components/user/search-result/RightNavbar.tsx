import { HotelCard } from './HotelCard';
import { Hotel } from '@/generated';
import Link from 'next/link';
import { SkeletonCard } from '../ui/cards';
import { SelectInput } from '@/features/user/search-result/SelectInput';

interface RightNavbarProps {
  data: Array<Hotel | null>;
  setSearchValuePrice: (_: 'asc' | 'desc') => void;
}

export const RightNavbar = ({ data, setSearchValuePrice }: RightNavbarProps) => {
  return (
    <div className="w-[872px] flex flex-col gap-4" data-testid="right-navbar">
      <div className="flex justify-between">
        <p className="text-[14px] leading-[20px] font-500" data-testid="property-count">
          {data.length} properties
        </p>

        <div className="flex flex-col space-y-8 w-72" data-testid="select-container">
          <div className="space-y-2" data-testid="select-wrapper">
            <SelectInput setSearchValuePrice={setSearchValuePrice} />
          </div>
        </div>
      </div>
      {data.length == 0 ? (
        <>
          <SkeletonCard data-testid="skeleton-card-1" />
          <SkeletonCard data-testid="skeleton-card-2" />
          <SkeletonCard data-testid="skeleton-card-3" />
        </>
      ) : (
        data?.map((hotelData) => (
          <Link key={hotelData?.id} href={`/hotel-detail/${hotelData?.id}`} data-testid={`hotel-link-${hotelData?.id}`}>
            <HotelCard data={hotelData} data-testid={`hotel-card-${hotelData?.id}`} />
          </Link>
        ))
      )}
    </div>
  );
};
