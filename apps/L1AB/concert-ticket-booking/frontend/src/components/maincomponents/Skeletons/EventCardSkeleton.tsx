import { Skeleton } from '@/components/ui/skeleton';

const eventData = new Array(12).fill(null);

export const EventCardSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-8 py-12 px-28  max-sm:grid-cols-1 max-sm:px-0 max-sm:py-4 max-md:py-4 max-md:grid-cols-2 max-md:px-3   max-lg:py-4 max-lg:grid-cols-2 max-lg:px-3 max-xl:px-3  ">
      {eventData.map((_, index) => (
        <div key={index} className="border dark:border-[#18181B] rounded-[8px]">
          <Skeleton className="h-[250px] dark:bg-gray-900 bg-gray-600 w-full"></Skeleton>
          <div className="dark:bg-[#131313] bg-gray-600 py-8 px-6 h-fit gap-6 grid">
            <div className="h-fit gap-2 grid">
              <Skeleton className="w-[188px] h-[28px] dark:bg-gray-800 bg-gray-700"></Skeleton>
              <Skeleton className="w-[80px] h-6 dark:bg-gray-800 bg-gray-700"></Skeleton>
            </div>
            <Skeleton className="w-[100px] h-8 dark:bg-gray-800 bg-gray-700"></Skeleton>
            <div className="flex justify-between">
              <div className="flex gap-2 text-[#A1A1AA] items-center">
                <Skeleton className="w-4 h-4 dark:bg-gray-800 bg-gray-700" />
                <Skeleton className="w-[40px] h-6 dark:bg-gray-800 bg-gray-700"></Skeleton>
              </div>
              <div className="flex gap-2 text-[#A1A1AA] items-center">
                <Skeleton className="w-4 h-4 text-gray-800 dark:bg-gray-800 bg-gray-700" />
                <Skeleton className="w-[82px] h-6 dark:bg-gray-800 bg-gray-700"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
