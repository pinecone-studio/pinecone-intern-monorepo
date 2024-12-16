import { Skeleton } from '@/components/ui/skeleton';

export const BookTicketSkeleton = () => {
  return (
    <div>
      <nav className="flex items-center justify-between border-b-[2px] dark:border-[#27272A] border-[#c6c6c6] py-8 px-12 max-sm:px-3 max-sm:justify-evenly  max-md:px-3 max-md:justify-evenly max-lg:px-3 max-lg:justify-evenly max-2xl:justify-between">
        <Skeleton className="bg-gray-900 dark:bg-[#131313]  h-10 w-10 text-white rounded-lg" data-testid="FaArrowLeftClick"></Skeleton>
        <Skeleton className="text-2xl bg-gray-900 dark:bg-[#131313]  font-semibold w-[220px] h-[32px] dark:text-white text-black max-sm:text-xl">Тасалбар захиалах</Skeleton>
        <Skeleton className="bg-transparent"></Skeleton>
      </nav>
      <div className="flex  max-md:grid max-sm:grid  max-lg:grid  max-lg:gap-12 items-center justify-center gap-96 py-40 max-sm:py-20 ">
        <Skeleton className="w-[600px] rounded-full max-sm:w-[330px] max-sm:h-[300px] dark:bg-[#131313] bg-gray-900 h-[560px] max-sm:mx-24" />
        <Skeleton className="dark:bg-[#131313] w-[390px]  bg-gray-900 h-[480px]  rounded-2xl px-6 max-sm:px-3  max-md:px-3"></Skeleton>
      </div>
    </div>
  );
};
