import { Skeleton } from '@/components/ui/skeleton';

const ProfileSectionSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-14 w-14 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
};

export default ProfileSectionSkeleton;
