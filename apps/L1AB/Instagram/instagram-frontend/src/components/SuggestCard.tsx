'use client';
import { UsersMap } from './UsersMap';
export const SuggestCard = () => {
  return (
    <div className="h-fit w-96 flex-col">
      <div className="flex justify-between">
        <p className="text-[#71717A] text-sm font-medium">Suggestions for you</p>
        <p className="text-sm font-medium cursor-pointer">See All</p>
      </div>

      <div>
        <UsersMap />
      </div>

      <div className="text-[#71717A] text-xs flex justify-center pt-8 w-full flex-col">
        <p className="flex">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p className="flex pt-4">© 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};