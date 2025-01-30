'use client';
import Image from 'next/image';
import Setting from './Setting';
import Followers from './Followers';
import Following from './Following';
import { useGetUserTogetherQuery } from '@/generated';
import { useParams } from 'next/navigation';
import StoryHighlight from './StoryHighlight';
import FollowersEmpty from './FollowersEmpty';
import EmptyFollowing from './EmptyFollowing';
import { Settings } from 'lucide-react';
import { IconPostSavedTag } from './IconPostSavedTag';

export const Profile = () => {
  const { userId } = useParams();
  const { data } = useGetUserTogetherQuery({
    variables: { searchingUserId: userId as string },
  });
  console.log('USER DATA', data);
  return (
    <div className="flex  flex-col py-10" data-testid="profile-visit-container">
      <div className="flex gap-20  ml-[72px]">
        <Image src="/images/profilePic.png" alt="zurag" width={150} height={150} className="w-[150px] h-[150px] object-cover rounded-full bg-red-700" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center justify-center">
            <p className="text-[20px] font-semibold ">{data?.getUserTogether.user?.userName}</p>

            <button className="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-bold">Edit profile</button>

            <button className="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-bold">Ad tools</button>
            <div className="flex justify-center items-center">
              <Setting>
                <Settings />
              </Setting>
            </div>
          </div>

          <div>
            <div className="flex  gap-[32px]">
              <div className="flex gap-1 ">
                <p className="text-base font-semibold">{data?.getUserTogether.user?.postCount}</p>
                <p className="text-base font-normal">posts</p>
              </div>

              {data?.getUserTogether.user?.followerCount ? (
                <Followers userId={userId as string}>
                  <div className="flex gap-1" data-testid="profile-followers">
                    <p className="text-base font-semibold">{data?.getUserTogether.user?.followerCount}</p>
                    <p className="text-base font-normal">followers</p>
                  </div>
                </Followers>
              ) : (
                <FollowersEmpty>
                  <div className="flex gap-1" data-testid="profile-followers-empty">
                    <p className="text-base font-semibold">{data?.getUserTogether.user?.followerCount}</p>
                    <p className="text-base font-normal">followers</p>
                  </div>
                </FollowersEmpty>
              )}

              {data?.getUserTogether.user?.followingCount ? (
                <Following userId={userId as string}>
                  <div className="flex gap-1">
                    <p className="text-base font-semibold">{data?.getUserTogether.user?.followingCount}</p>
                    <p className="text-base font-normal">following</p>
                  </div>
                </Following>
              ) : (
                <EmptyFollowing>
                  <div className="flex gap-1">
                    <p className="text-base font-semibold">{data?.getUserTogether.user?.followingCount}</p>
                    <p className="text-base font-normal">following</p>
                  </div>
                </EmptyFollowing>
              )}
            </div>
          </div>

          <div>
            <p className="text-base font-semibold">{data?.getUserTogether.user?.userName}</p>
            <p className="text-xs font-medium text-[#71717A]">{data?.getUserTogether.user?.bio}</p>

            <a className="text-sm font-medium text-[#2563EB]">{data?.getUserTogether.user?.email}</a>
          </div>
        </div>
      </div>
      <StoryHighlight />
      <IconPostSavedTag userId={userId as string} />
    </div>
  );
};
