import { IoSettingsOutline } from 'react-icons/io5';
import Image from 'next/image';
import { MenuButtons } from './Home/leftSideBar/MenuButtonsSideBar';
const Profile = () => {
  return (
    <div className="flex gap-[361px]  ">
      <MenuButtons />
      <div className="mt-14 flex gap-[100px]">
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden relative ">
          <Image src="/images/profilePic.png" alt="zurag orno" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-3 itemst-center justify-center">
            <p className="text-[20px] font-semibold">upvox_</p>
            <button className="border px-4 py-2 bg-[#F4F4F5]  rounded-md text-sm  font-medium">Edit profile </button>
            <button className="border px-4 py-2 bg-[#F4F4F5] rounded-md  text-sm  font-medium">Ad tools </button>
            <div className="flex justify-center items-center">
              <IoSettingsOutline />
            </div>
          </div>
          <div className="flex gap-[32px]">
            <div className="flex">
              <p className="text-base font-semibold">11 </p>
              <p className="text-base font-normal"> posts</p>
            </div>

            <div className="flex">
              <p className="text-base font-semibold">17 </p>
              <p className="text-base font-normal"> followers</p>
            </div>
            <div className="flex">
              <p className="text-base font-semibold">14 </p>
              <p className="text-base font-normal"> following </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
