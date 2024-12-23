'use client';
import { UsersMap } from './UsersMap';
export const SuggestCard = () => {
  return (
    <div className="h-fit w-[326px] flex-col" data-cy="SuggestSideBar">
      <div className="flex justify-between">
        <p className="text-[#71717A] text-sm font-mediumv dark:font-extrabold">Suggestions for you</p>
        <p className="text-sm font-medium cursor-pointer dark:font-sans dark:font-medium">See All</p>
      </div>

      <div>
        <UsersMap />
      </div>
      <div className="text-[#71717A] text-xs flex justify-center pt-8 w-full flex-col leading-4">
        <p className="flex">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p className="flex pt-4">© 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};
