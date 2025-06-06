'use client';
import { Button } from '@/components/ui/button';
import SearchFilter from './(main)/_components/SeacrhFilter';
import { Card } from './(main)/_features/Card';
import { Footer } from './_components/Footer';
import { HomeHeadline } from './_components/HomeHeadline';
import { useHotelsQuery } from '@/generated';

const Page = () => {
  const { data } = useHotelsQuery();
  const hotels = data?.hotels;

  return (
    <div>
      <main>
        <HomeHeadline />
        <SearchFilter />
        <div className="flex flex-col max-w-[1165px] w-full mt-10 justify-start items-start m-auto">
          <div className="flex justify-between max-w-[1165px] w-full">
            <h3 className="font-semibold text-2xl mb-6  ">Popular Hotels</h3>
            <Button className="w-[84px] h-[40px] bg-white  border-[1px] text-black hover:bg-transparent">View all</Button>
          </div>
          <div className=" max-width-[1165px] w-full grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-4 m-auto">
            {hotels?.slice(0, 8).map((hotel, index) => (
              <Card key={index} imageUrl={hotel?.images?.[0]} name={hotel?.name} starRating={hotel?.starRating} amenities={hotel?.amenities} rating={hotel?.rating} />
            ))}
          </div>
        </div>
        <div className="flex flex-col max-w-[1165px] w-full mt-16 justify-start items-start m-auto">
          <div className="flex justify-between max-w-[1165px] w-full">
            <h3 className="font-semibold text-2xl mb-6">Most booked hotel in Mongolia in past months</h3>
            <Button className="w-[84px] h-[40px] bg-white  border-[1px] text-black hover:bg-transparent">View all</Button>
          </div>
          <div className=" max-width-[1165px] w-full grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-4 m-auto">
            {hotels?.slice(0, 4).map((hotel, index) => (
              <Card key={index} imageUrl={hotel?.images?.[0]} name={hotel?.name} starRating={hotel?.starRating} amenities={hotel?.amenities} rating={hotel?.rating} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
