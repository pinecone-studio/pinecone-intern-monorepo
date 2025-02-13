'use client';
import Image from 'next/image';
import Followers from './follow/Followers';
import Following from './follow/Following';
import { useGetUserTogetherQuery } from '@/generated';
import { useParams } from 'next/navigation';
import StoryHighlight from './story/StoryHighlight';
import FollowersEmpty from './follow/FollowersEmpty';
import EmptyFollowing from './follow/EmptyFollowing';
import { IconPostSavedTag } from '../../features/profile/comment/IconPostSavedTag';
import { Buttons } from './isOwnerId/Buttons';

export const Profile = () => {
  const { userId } = useParams();
  const { data } = useGetUserTogetherQuery({
    variables: { searchingUserId: userId as string },
  });

  return (
    <div className="flex flex-col py-10" data-testid="profile-visit-container">
      <div className="flex gap-20 ml-[72px]">
        <Image src="/images/profilePic.png" alt="Profile Picture" width={150} height={150} className="w-[150px] h-[150px] object-cover rounded-full bg-red-700" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center justify-center">
            <p className="text-[20px] font-semibold">{data?.getUserTogether?.user?.userName}</p>

            <Buttons userId={userId as string} />
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
    </div>
  );
};
