'use client';
import { useGetAllEventsQuery } from '@/generated';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { Skeleton } from '@/components/ui/skeleton';
export const MainHeroComponent = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { data, loading } = useGetAllEventsQuery();

  const SpecialFilteredData = data?.getAllEvents.filter((item) => item.status === 'Онцлох') || [];

  const slideRight = useCallback(() => {
    setIsTransitioning(true);
    setCurrent((prev) => (prev === SpecialFilteredData.length - 1 ? 0 : prev + 1));
  }, [SpecialFilteredData.length]);

  const slideLeft = useCallback(() => {
    setIsTransitioning(true);
    setCurrent((prev) => (prev === 0 ? SpecialFilteredData.length - 1 : prev - 1));
  }, [SpecialFilteredData.length]);

  useEffect(() => {
    if (autoplay) {
      const timeout = setTimeout(slideRight, 2500);
      return () => clearTimeout(timeout);
    }
  }, [autoplay, current, slideRight]);

  if (loading) {
    return <Skeleton className=" h-[550px] w-full bg-gray-900"></Skeleton>;
  }

  return (
    <div className="relative w-full overflow-hidden h-[550px] max-md:w-full" data-testid="main-hero">
      <div
        data-testid="carousel-track"
        style={{
          transform: `translateX(-${(current * 100) / SpecialFilteredData?.length}%)`,
          width: `${100 * SpecialFilteredData?.length}%`,
        }}
        className={`carousel-track absolute bg-gray-700 flex h-full ${isTransitioning ? 'duration-1000 ease-in-out' : ''}`}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        {SpecialFilteredData?.map((item, index) => (
          <div data-testid={`getCancel-${index}`} key={index} className="relative h-[550px] w-full">
            <Image src={item.images[1] || '/placeholder.jpg'} fill alt={`Event Image ${index + 1}`} className="object-cover" quality={100} priority />
            <div className="h-[550px] bg-black bg-opacity-50 z-50 space-y-4 absolute text-white flex justify-center items-center w-full">
              <div className="rounded text-center  bg-opacity-20 backdrop-filter backdrop-blur-md px-4 py-2">
                <div className="text-xl mt-4 max-sm:text-sm flex gap-2  items-center justify-center ">
                  {item.artistName.map((artist, index) => (
                    <div key={index} className={` ${index !== 0 ? 'max-sm:hidden' : ''}`}>
                      {artist}
                    </div>
                  ))}
                </div>
                <h1 className="text-6xl font-semibold max-sm:text-2xl max-sm:max-w-[160px] ">{item.name}</h1>
                <div className="text-xl mt-4 flex gap-2 items-center justify-center">
                  {item.eventDate.map((date, index) => (
                    <div className="flex gap-1 justify-center items-center max-sm:text-sm " key={index}>
                      <FiCalendar className="w-4 h-4 max-sm:hidden" />
                      <p className={` ${index !== 0 ? 'max-sm:hidden' : ''}`}>{date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        <button
          data-testid={`left`}
          className="z-50 absolute top-1/2 left-4 bg-gray-300 rounded-md flex items-center justify-center max-sm:h-7 h-8 w-6 cursor-pointer text-black text-3xl"
          onClick={slideLeft}
        >
          &lsaquo;
        </button>
        <button
          data-testid={`right`}
          className="z-50 absolute top-1/2 right-4 bg-gray-300 rounded-md flex items-center justify-center max-sm:h-7  h-8 w-6 cursor-pointer text-black text-3xl "
          onClick={slideRight}
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
};
