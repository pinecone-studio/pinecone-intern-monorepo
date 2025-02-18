import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCard = () => {
  return (
    <div data-testid="skeleton-card" className="w-[872px] flex border border-[#E4E4E7] rounded-md">
      <Skeleton className="h-[222.19px] w-[395px]" />
      <div className="w-[477px] p-5 flex">
        <div className="w-[349px] flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-[250px]" />
            <div className="flex gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
        <div className="w-[88px] flex flex-col gap-1 justify-end">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};
