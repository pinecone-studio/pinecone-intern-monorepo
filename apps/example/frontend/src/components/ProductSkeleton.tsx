import { Skeleton } from '@/components/ui/skeleton';

const ProductSkeleton = () => (
  <div className="flex gap-3 items-center">
    <div className="flex gap-3">
      <div className="top-16 h-[640px]">
        <div className="my-36 gap-2 grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="relative w-[70px] h-[70px] rounded-md cursor-pointer border border-gray-300" key={index}>
              <Skeleton className="rounded-md object-cover w-full h-full" />
            </div>
          ))}
        </div>
      </div>
      <Skeleton className="relative w-[430px] h-[640px] mb-8"></Skeleton>
    </div>
    <div className="grid gap-4">
      <Skeleton className="w-[50px] h-[20px] border border-gray-300 rounded-xl items-center my-2 font-semibold text-[12px]">&nbsp;</Skeleton>
      <h1 className="font-bold text-2xl flex gap-2">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </h1>
      <Skeleton className="h-4 w-full rounded" />
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="border rounded-full w-[44px] h-[46px]" />
        ))}
      </div>
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="cursor-pointer border border-gray-300 w-8 h-8 justify-center flex items-center rounded-full" />
        <Skeleton className="h-6 w-2 rounded" />
        <Skeleton className="cursor-pointer border border-gray-300 w-8 h-8 justify-center flex items-center rounded-full" />
      </div>
      <Skeleton className="font-bold text-xl h-6 w-1/2 rounded" />
      <Skeleton className="w-[128px] rounded-full h-[40px]" />
      <Skeleton className="w-[160px] h-[24px]" />
    </div>
  </div>
);

export default ProductSkeleton;
