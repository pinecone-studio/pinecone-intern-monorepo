import { HotelCard } from './HotelCard';
import { Hotel } from '@/generated';
import Link from 'next/link';
import { SelectInput } from '@/features/user/search-result/SelectInput';
import { LucideHotel } from 'lucide-react';
import { SkeletonCard } from '../ui/cards';

interface RightNavbarProps {
  data: Array<Hotel | null>;
  setSearchValuePrice: (_: 'asc' | 'desc') => void;
  isLoading: boolean;
}

export const RightNavbar = ({ data, setSearchValuePrice, isLoading }: RightNavbarProps) => {
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
          <Link key={hotelData?.id} href={`/hotel-detail/${hotelData?.id}`} data-testid={`hotel-link-${hotelData?.id}`}>
            <HotelCard data={hotelData} data-testid={`hotel-card-${hotelData?.id}`} />
          </Link>
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
