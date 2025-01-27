'use client';
import { IoSettingsOutline } from 'react-icons/io5';
import Image from 'next/image';
import Setting from './Setting';

import Post from './Post';
import Followers from './Followers';
import Following from './Following';
import { useGetUserTogetherQuery } from '@/generated';
import { useParams } from 'next/navigation';

export const Profile = () => {
  const { userId } = useParams();
  const { data } = useGetUserTogetherQuery({
    variables: { searchingUserId: userId as string },
  });

  return (
    <div className="flex gap-4 flex-col py-10" date-testid="profile">
      <div className="flex gap-20 ml-[72px]">
        <Image src="/images/profilePic.png" alt="zurag" width={150} height={150} className="w-[150px] h-[150px] object-cover rounded-full bg-red-700" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center justify-center">
            <p className="text-[20px] font-semibold ">{data?.getUserTogether.user?.userName}</p>

            <button className="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-medium">Edit profile</button>

            <button className="border px-4 py-2 bg-[#F4F4F5] rounded-md text-sm font-medium">Ad tools</button>
            <div className="flex justify-center items-center">
              <Setting>
                <IoSettingsOutline />
              </Setting>
            </div>
          </div>

          <div>
            <div className="flex w-full justify-between">
              <div className="flex gap-1 ">
                <p className="text-base font-semibold">{data?.getUserTogether.user?.postCount}</p>
                <p className="text-base font-normal">posts</p>
              </div>
              {/* {data?.getUserTogether.user?.followerCount || 0 ? ( */}
              <Followers userId={userId as string}>
                <div className="flex gap-1">
                  <p className="text-base font-semibold">{data?.getUserTogether.user?.followerCount}</p>
                  <p className="text-base font-normal">followers</p>
                </div>
              </Followers>
              {/* ) : (
                <FollowersEmpty>
                  <div className="flex gap-1">
                    <p className="text-base font-semibold">{data?.getUserTogether.user?.followerCount}</p>
                    <p className="text-base font-normal">followers</p>
                  </div>
                </FollowersEmpty>
              )} */}
              {/* {data?.getUserTogether.user?.followingCount || 0 ? ( */}
              <Following userId={userId as string}>
                <div className="flex gap-1">
                  <p className="text-base font-semibold">{data?.getUserTogether.user?.followingCount}</p>
                  <p className="text-base font-normal">following</p>
                </div>
              </Following>
              {/* ) : (
                <EmptyFollowing>
                  <div className="flex gap-1">
                    <p className="text-base font-semibold">{data?.getUserTogether.user?.followingCount}</p>
                    <p className="text-base font-normal">following</p>
                  </div>
                </EmptyFollowing>
              )} */}
            </div>
          </div>

          <div>
            <p className="text-base font-semibold">{data?.getUserTogether.user?.userName}</p>
            <p className="text-xs font-medium text-[#71717A]">{data?.getUserTogether.user?.bio}</p>

            <a className="text-sm font-medium text-[#2563EB]">{data?.getUserTogether.user?.fullName}</a>
          </div>
        </div>
      </div>

      <Post userId={userId as string} />
    </div>
  );
};
