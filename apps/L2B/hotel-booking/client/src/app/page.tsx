'use client';
import { Button } from '@/components/ui/button';
import SearchFilter from './(main)/_components/SeacrhFilter';
import Card from './_components/Card/Card';
import { Footer } from './_components/Footer';
import { HomeHeadline } from './_components/HomeHeadline';

const Page = () => {
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((card, index) => (
              <Card key={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col max-w-[1165px] w-full mt-16 justify-start items-start m-auto">
          <div className="flex justify-between max-w-[1165px] w-full">
            <h3 className="font-semibold text-2xl mb-6">Most booked hotels in Mongolia in past months</h3>
            <Button className="w-[84px] h-[40px] bg-white  border-[1px] text-black hover:bg-transparent">View all</Button>
          </div>
          <div className=" max-width-[1165px] w-full grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-4 m-auto">
            {[1, 2, 3, 4].map((card, index) => (
              <Card key={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
