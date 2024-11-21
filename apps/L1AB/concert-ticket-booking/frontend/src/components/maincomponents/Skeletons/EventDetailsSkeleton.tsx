import { Skeleton } from '@/components/ui/skeleton';

export const EventDetailsSkeleton = () => {
  return (
    <div>
      <div className="relative">
        <Skeleton className="h-[250px] w-full bg-gray-900">
          <div className="absolute h-fit grid gap-3 top-12 left-24 backdrop-blur-sm px-4 py-2 ">
            <Skeleton className=" bg-gray-800 border px-3 py-[6px] text-[16px] w-[120px] h-[36px] text-white border-[#FAFAFA33] rounded-full"></Skeleton>
            <div className="grid h-fit gap-6 w-fit">
              <Skeleton className="text-5xl bg-gray-800 font-bold text-white w-[380px] h-[48px]"></Skeleton>
              <div className="flex gap-2">
                <Skeleton className="flex bg-gray-800 items-center gap-2 w-[24px] h-[24px]"></Skeleton>
                <Skeleton className="flex bg-gray-800 items-center gap-2 w-[105px] h-[24px]"></Skeleton>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
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
    </div>
  );
};
