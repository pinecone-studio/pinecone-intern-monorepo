import { Skeleton } from '@/components/ui/skeleton';

export const EventDetailsSkeleton = () => {
  return (
    <div>
      <Skeleton className="relative h-[250px] w-full dark:bg-gray-900 bg-gray-600">
        <Skeleton>
          <div className="absolute h-fit grid gap-3 top-12 left-24 backdrop-blur-sm px-4 py-2 ">
            <Skeleton className=" dark:bg-gray-800 bg-gray-700 border px-3 py-[6px] text-[16px] w-[120px] max-sm:w-[98px] max-sm:h-[30px] h-[36px] text-white border-[#FAFAFA33] rounded-full"></Skeleton>
            <div className="grid h-fit gap-6 w-fit">
              <Skeleton className="text-5xl dark:bg-gray-800 bg-gray-700 font-bold max-sm:text-sm max-sm:px-2   max-sm:py-1  text-white w-[380px] h-[48px] max-sm:w-[166px] max-sm:h-[28px]"></Skeleton>
              <div className="flex gap-2">
                <Skeleton className="flex dark:bg-gray-800 bg-gray-600 items-center gap-2 w-[24px] h-[24px] max-sm:w-[9px] max-sm:h-[9px]"></Skeleton>
                <Skeleton className="flex dark:bg-gray-800 bg-gray-600  items-center gap-2 w-[105px] h-[24px] max-sm:w-[38px] max-sm:h-[18px]"></Skeleton>
              </div>
            </div>
          </div>
        </Skeleton>
      </Skeleton>

      <div className="flex px-[212px] py-12  max-sm:grid max-sm:px-3 max-sm:gap-3 max-md:grid max-md:px-3 max-md:gap-3 max-lg:grid max-lg:px-3 max-lg:gap-3 max-xl:grid max-xl:px-3 max-xl:gap-3 max-2xl:grid max-2xl:px-3 max-2xl:gap-3">
        <div className="flex-1 grid gap-5">
          <div className="flex justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Skeleton className="text-[#FAFAFA80] w-[20px]  h-[20px] dark:bg-gray-900 bg-gray-600" />
                <Skeleton className="text-[#FAFAFA] opacity-80 font-light dark:bg-gray-900 bg-gray-600w-[100px] h-[24px]"></Skeleton>
              </div>
              <div className="flex gap-2 items-center">
                <Skeleton className="text-[#FAFAFA80] w-[20px] dark:bg-gray-900 bg-gray-600 h-[20px]" />
                <Skeleton className="text-[#FAFAFA] opacity-80 dark:bg-gray-900 bg-gray-600 w-[100px] h-[24px]"></Skeleton>
              </div>
            </div>
            <div className="flex gap-2 text-[#A1A1AA] items-center">
              <Skeleton className="w-[20px] dark:bg-gray-900 bg-gray-600 h-[20px]" />
              <Skeleton className=" text-[#FAFAFA] dark:bg-gray-900 bg-gray-600 text-[16px]  w-[100px] h-[24px] underline underline-offset-2"></Skeleton>
            </div>
          </div>
          <div className="h-fit grid gap-2 ">
            <Skeleton className="text-[#FAFAFA] font-extralight w-[100px] h-[24px] dark:bg-gray-900 bg-gray-600"></Skeleton>
            <Skeleton className="font-semibold text-[#FFFFFF] px-3 w-[120px] h-[30px] dark:bg-gray-900 bg-gray-600"></Skeleton>
            <Skeleton className="text-[#FAFAFA] font-extralight w-[190px] h-[24px] dark:bg-gray-900 bg-gray-600"></Skeleton>
            <Skeleton className="font-semibold text-[#FFFFFF] px-3 w-[120px] h-[30px] dark:bg-gray-900 bg-gray-600"></Skeleton>
            <Skeleton className="font-semibold text-[#FFFFFF] px-3 w-[160px] h-[30px] dark:bg-gray-900 bg-gray-600"></Skeleton>
          </div>
          <div className="grid gap-2">
            <Skeleton className="text-[#FAFAFA] font-light w-[100px] h-[24px] dark:bg-gray-900 bg-gray-600"></Skeleton>
            <Skeleton className="h-[560px] w-full relative dark:bg-gray-900 bg-gray-600 max-sm:h-[300px]"></Skeleton>
          </div>
        </div>

        <div className="w-fit  max-md:px-36 max-sm:px-0 max-lg:px-44  max-xl:w-full max-2xl:w-full">
          <div className="rounded-2xl px-6">
            <div className="h-fit grid gap-2 ">
              <Skeleton className="opacity-50 text-white dark:bg-gray-900 bg-gray-600"></Skeleton>
            </div>
            <div className="grid h-fit gap-2 ">
              <Skeleton className="w-[284px] h-[308px] dark:bg-gray-900 bg-gray-600"></Skeleton>
              <Skeleton className=" text-black w-[284px] h-[40px] dark:bg-gray-900 bg-gray-600 py-2 px-4 my-6 hover:bg-[#6fcceb]"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
