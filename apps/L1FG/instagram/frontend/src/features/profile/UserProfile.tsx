import EmptyFollowing from '@/components/profile/follow/EmptyFollowing';
import Followers from '@/components/profile/follow/Followers';
import FollowersEmpty from '@/components/profile/follow/FollowersEmpty';
import Following from '@/components/profile/follow/Following';
import { Buttons } from '@/components/profile/isOwnerId/Buttons';
import StoryHighlight from '@/components/profile/story/StoryHighlight';
import { GetUserTogetherQuery } from '@/generated';
import Image from 'next/image';
import { IconPostSavedTag } from './comment/IconPostSavedTag';

export const UserProfile = ({ data, userId }: { data: GetUserTogetherQuery; userId: string }) => {
  return (
    <>
      <div className="flex gap-20 ml-[72px]" data-testid="user-profile">
        <Image src="/images/profilePic.png" alt="Profile Picture" width={150} height={150} className="w-[150px] h-[150px] object-cover rounded-full bg-red-700" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center justify-center">
            <p className="text-[20px] font-semibold">{data?.getUserTogether?.user?.userName}</p>

            <Buttons userId={userId as string} data={data} />
          </div>

          <div>
            <div className="flex gap-[32px]">
              <div className="flex gap-1">
                <p className="text-base font-semibold">{data?.getUserTogether?.user?.postCount}</p>
                <p className="text-base font-normal">posts</p>
              </div>

              {data?.getUserTogether?.user?.followerCount ? (
                <Followers userId={userId as string}>
                  <div className="flex gap-1" data-testid="profile-followers">
                    <p className="text-base font-semibold">{data?.getUserTogether?.user?.followerCount}</p>
                    <p className="text-base font-normal">followers</p>
                  </div>
                </Followers>
              ) : (
                <FollowersEmpty>
                  <div className="flex gap-1" data-testid="profile-followers-empty">
                    <p className="text-base font-semibold">0</p>
                    <p className="text-base font-normal">followers</p>
                  </div>
                </FollowersEmpty>
              )}

              {data?.getUserTogether?.user?.followingCount ? (
                <Following userId={userId as string}>
                  <div className="flex gap-1">
                    <p className="text-base font-semibold">{data?.getUserTogether?.user?.followingCount}</p>
                    <p className="text-base font-normal">following</p>
                  </div>
                </Following>
              ) : (
                <EmptyFollowing>
                  <div className="flex gap-1">
                    <p className="text-base font-semibold">0</p>
                    <p className="text-base font-normal">following</p>
                  </div>
                </EmptyFollowing>
              )}
            </div>
          </div>

          <div>
            <p className="text-base font-semibold">{data?.getUserTogether?.user?.fullName}</p>
            <p className="text-xs font-medium text-[#71717A]">{data?.getUserTogether?.user?.bio}</p>
            {data?.getUserTogether?.user?.email && <a className="text-sm font-medium text-[#2563EB]">{data.getUserTogether.user.email}</a>}
          </div>
        </div>
      </div>
      <StoryHighlight userId={userId as string} />
      <IconPostSavedTag userId={userId as string} />
    </>
  );
};
