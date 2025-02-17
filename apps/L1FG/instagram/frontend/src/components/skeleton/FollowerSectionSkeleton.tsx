import { Skeleton } from '@/components/ui/skeleton';

const FollowerSectionSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-5 w-[50px]" />
      <Skeleton className="h-5 w-16" />
    </div>
  );
};

export default FollowerSectionSkeleton;
