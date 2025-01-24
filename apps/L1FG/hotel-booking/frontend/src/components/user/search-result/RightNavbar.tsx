import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HotelCard } from './HotelCard';
import { Hotel } from '@/generated';
import Link from 'next/link';

interface RightNavbarProps {
  data: Array<Hotel>;
}

export const RightNavbar = ({ data }: RightNavbarProps) => {
  return (
    <div className="w-[872px] flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-[14px] leading-[20px] font-500">51 properties</p>

        <div className="flex flex-col space-y-8 w-72">
          <div className="space-y-2">
            <Select>
              <SelectTrigger data-testid="select-trigger">
                <SelectValue placeholder="Recommended" />
              </SelectTrigger>
              <SelectContent data-testid="select-content">
                <SelectItem value="recommended" data-testid="select-item-recommended">
                  Recommended
                </SelectItem>
                <SelectItem value="lowtohigh" data-testid="select-item-lowtohigh">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="hightolow" data-testid="select-item-hightolow">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="star" data-testid="select-item-star">
                  Star Rating
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {data?.map((hotelData) => (
        <Link key={hotelData?.id} href={`/hotel-detail/${hotelData?.id}`}>
          <HotelCard data={hotelData} />
        </Link>
      ))}
    </div>
  );
};
