import FollowButtonSkeleton from './FollowButtonSkeleton';
import FollowerSectionSkeleton from './FollowerSectionSkeleton';
import PostSectionSkeletonPost from './PostSectionSkeleton';
import ProfileSectionSkeleton from './ProfileSectionSkeleton';

export const ProfilePreviewSkeleton = () => {
  return (
    <div className="w-[348px] h-[336px]">
      <div className="flex gap-4 h-fit w-fit justify-center items-center p-3">
        <ProfileSectionSkeleton />
      </div>
      <div className="w-[348px] h-[48px] flex flex-row items-center justify-around pt-6">
        <FollowerSectionSkeleton />
        <FollowerSectionSkeleton />
        <FollowerSectionSkeleton />
      </div>
      <div className="flex flex-row justify-around gap-1 w-full pt-6">
        <PostSectionSkeletonPost />
        <PostSectionSkeletonPost />
        <PostSectionSkeletonPost />
      </div>
      <div className="flex mt-2 p-3">
        <FollowButtonSkeleton />
      </div>
    </div>
  );
};
