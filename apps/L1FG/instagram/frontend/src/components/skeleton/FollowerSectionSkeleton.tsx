import { Skeleton } from '@/components/ui/skeleton';

const FollowerSectionSkeleton = () => {
  return (
    <div className="space-y-2 flex flex-col items-center">
      <Skeleton className="h-4 w-10" />
      <Skeleton className="h-4 w-16" />
    </div>
  );
};

export default FollowerSectionSkeleton;
