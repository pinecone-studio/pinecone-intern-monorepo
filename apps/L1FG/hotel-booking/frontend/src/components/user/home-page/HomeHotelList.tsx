import Link from 'next/link';
import { HomePageCard } from '../ui/cards';
import { Hotel } from '@/generated';

interface HomeHotelListProps {
  data: Hotel[] | undefined;
}

export const HomeHotelList = ({ data }: HomeHotelListProps) => {
  return (
    <div>
      <div className="container mx-auto w-full pt-8 pb-14">
        <div className="w-full flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
              <p className="font-Inter font-semibold not-italic text-2xl text-[#09090B] tracking-[-0.6px]">Popular Hotels</p>
              <Link href="/search-hotels">
                <button className="px-4 py-2 rounded-md h-10 border border-[#E4E4E7]">
                  <p className="font-Inter font-medium not-italic text-sm text-[#18181B]">View all</p>
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {data?.map((singleHotel) => (
                <Link key={singleHotel?.id} href={`/hotel-detail/${singleHotel?.id}`}>
                  <HomePageCard data={singleHotel} />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
              <p className="font-Inter font-semibold not-italic text-2xl text-[#09090B] tracking-[-0.6px]">Most booked hotels in Mongolia in past month</p>
              <Link href="/search-hotels">
                <button className="px-4 py-2 rounded-md h-10 border border-[#E4E4E7]">
                  <p className="font-Inter font-medium not-italic text-sm text-[#18181B]">View all</p>
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {data?.map((singleHotel) => (
                <HomePageCard key={singleHotel?.id} data={singleHotel} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
