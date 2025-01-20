import { Camera } from 'lucide-react';

import Saved from '../svg/Saved';
import Posts from '../svg/Posts';

const PostEmpty = () => {
  return (
    <div className="flex flex-col gap-4" data-testid="post-empty">
      <div>
        <p className="w-[935px] border"></p>
      </div>

      <div className="flex justify-center gap-4">
        <div className="flex justify-center items-center gap-1 ">
          <Posts />
          <p className="text-xs font-medium tex-[#09090B]">POSTS</p>
        </div>
        <div className="flex justify-center items-center gap-1 ">
          <Saved />
          <p className="text-xs font-medium tex-[#09090B]">SAVED</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 mt-[100px]">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="rounded-full border border-black h-[90px] w-[90px] flex justify-center items-center">
            <Camera className="h-10 w-10 " />
          </div>
          <h2 className="font-semibold text-3xl">Share Photos</h2>
        </div>

        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-base">When you share photos, they will appear </p>
            <p className="font-semibold text-base">on your profile. </p>
          </div>
          <p className="font-medium text-sm text-[#2563EB]">Share your first photo</p>
        </div>
      </div>

      <div className="text-gray-500 text-wrap text-[12px] flex flex-col gap-4 mt-8 ">
        <p className="flex justify-center">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p className="flex justify-center">© 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};
export default PostEmpty;
