import { IoSettingsOutline } from 'react-icons/io5';
import Image from 'next/image';
import Post from './Post';
import Followers from './Followers';
import Following from './Following';
import Settings from './Settings';

const Profile = () => {
  return (
    <div className=" flex gap-4 flex-col py-10 ">
      <div className="flex gap-20 ml-[72px] ">
        <Image src="/images/profilePic.png" alt="zurag" width={150} height={150} className="w-[150px] h-[150px] object-cover rounded-full bg-red-700" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 itemst-center justify-center">
            <p className="text-[20px] font-semibold">upavox_</p>
            <button className="border px-4 py-2 bg-[#F4F4F5]  rounded-md text-sm  font-medium">Edit profile </button>
            <button className="border px-4 py-2 bg-[#F4F4F5] rounded-md  text-sm  font-medium">Ad tools </button>
            <div className="flex justify-center items-center">
              <Settings>
                <IoSettingsOutline />
              </Settings>
            </div>
          </div>

          <div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <p className="text-base font-semibold"> 11</p>
                <p className="text-base font-normal">posts</p>
              </div>
              <Followers>
                <div className="flex">
                  <p className="text-base font-semibold">17 </p>
                  <p className="text-base font-normal">followers</p>
                </div>
              </Followers>
              <Following>
                <div className="flex">
                  <p className="text-base font-semibold"> 14</p>
                  <p className="text-base font-normal">following</p>
                </div>
              </Following>
            </div>
          </div>

          <div>
            <p className="text-base font-semibold">Upvox</p>
            <p className="text-xs font-medium text-[#71717A]">Product/service</p>
            <p className="text-sm font-medium text-[#09090B]"> Your favorite fun clips in language</p>
            <p className="text-sm font medium text-[#2563EB]">upvox,.net</p>
          </div>
        </div>
      </div>
      <Post />
    </div>
  );
};

export default Profile;
