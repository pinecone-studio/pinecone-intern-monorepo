import { Skeleton } from '@/components/ui/skeleton';

const CommentPreviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-[35px] w-[35px] rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-[22px] w-[300px]" />
            <Skeleton className="h-[22px] w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentPreviewSkeleton;
