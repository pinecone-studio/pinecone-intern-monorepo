'use client';
import { IoSettingsOutline } from 'react-icons/io5';
import Image from 'next/image';

import Followers from './Following';
import Following from './Followers';
import Setting from './Setting';
import { useAuth } from '../providers/AuthProvider';
import PostEmpty from './PostEmpty';

import Post from './Post';

const Profile = () => {
  const { user } = useAuth();

  const userPosts = user?.bio || [];
  return (
    <div className="flex gap-4 flex-col py-10">
      <div className="flex gap-20 ml-[72px]">
        <Image src="/images/profilePic.png" alt="zurag" width={150} height={150} className="w-[150px] h-[150px] object-cover rounded-full bg-red-700" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center justify-center">
            <p className="text-[20px] font-semibold ">{user?.userName}</p>

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
                <p className="text-base font-semibold">{userPosts.length}</p>
                <p className="text-base font-normal">posts</p>
              </div>
              <Following>
                <div className="flex gap-1">
                  <p className="text-base font-semibold">{user?.followerCount}</p>
                  <p className="text-base font-normal">followers</p>
                </div>
              </Following>
              <Followers>
                <div className="flex gap-1">
                  <p className="text-base font-semibold">{user?.followingCount}</p>
                  <p className="text-base font-normal">following</p>
                </div>
              </Followers>
            </div>
          </div>

          <div>
            <p className="text-base font-semibold">{user?.userName}</p>
            <p className="text-xs font-medium text-[#71717A]">{user?.bio}</p>

            <a className="text-sm font-medium text-[#2563EB]">{user?.fullName}</a>
          </div>
        </div>
      </div>

      {userPosts.length > 0 ? <Post /> : <PostEmpty />}
    </div>
  );
};

export default Profile;
