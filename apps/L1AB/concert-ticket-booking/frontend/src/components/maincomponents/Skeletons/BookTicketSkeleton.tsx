import { Skeleton } from '@/components/ui/skeleton';

export const BookTicketSkeleton = () => {
  return (
    <div className="flex px-[212px] py-12 flex-col md:flex-row gap-8">
      <div className="flex-1 grid gap-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="text-[#FAFAFA80] w-[20px]  h-[20px] bg-gray-900 " />
              <Skeleton className="text-[#FAFAFA] opacity-80 font-light bg-gray-900 w-[100px] h-[24px]"></Skeleton>
            </div>
            <div className="flex gap-2 items-center">
              <Skeleton className="text-[#FAFAFA80] w-[20px] bg-gray-900 h-[20px]" />
              <Skeleton className="text-[#FAFAFA] opacity-80 bg-gray-900 w-[100px] h-[24px]"></Skeleton>
            </div>
          </div>
          <div className="flex gap-2 text-[#A1A1AA] items-center">
            <Skeleton className="w-[20px] bg-gray-900 h-[20px]" />
            <Skeleton className=" text-[#FAFAFA] bg-gray-900 text-[16px]  w-[100px] h-[24px] underline underline-offset-2"></Skeleton>
          </div>
        </div>
        <div className="h-fit grid gap-2">
          <Skeleton className="text-[#FAFAFA] font-extralight w-[100px] h-[24px] bg-gray-900 "></Skeleton>
          <Skeleton className="font-semibold text-[#FFFFFF] px-3 w-[120px] h-[30px] bg-gray-900"></Skeleton>
          <Skeleton className="text-[#FAFAFA] font-extralight w-[190px] h-[24px] bg-gray-900"></Skeleton>
          <Skeleton className="font-semibold text-[#FFFFFF] px-3 w-[120px] h-[30px] bg-gray-900"></Skeleton>
          <Skeleton className="font-semibold text-[#FFFFFF] px-3 w-[160px] h-[30px] bg-gray-900"></Skeleton>
        </div>
        <div className="grid gap-2">
          <Skeleton className="text-[#FAFAFA] font-light w-[100px] h-[24px] bg-gray-900"></Skeleton>
          <Skeleton className="h-[560px] w-full relative bg-gray-900"></Skeleton>
        </div>
      </div>
      <div className="w-fit">
        <div className="rounded-2xl px-6">
          <div className="h-fit grid gap-2 py-6">
            <Skeleton className="opacity-50 text-white bg-gray-900"></Skeleton>
          </div>
          <div className="grid h-fit gap-2 ">
            <Skeleton className="w-[345px] h-[300px] bg-gray-900"></Skeleton>
            <Skeleton className=" text-black w-[345px] h-[40px] bg-gray-900 py-2 px-4 my-6 hover:bg-[#6fcceb]"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};
