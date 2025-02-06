import { UserPen } from 'lucide-react';

const Tagged = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-center items-center gap-2 mt-20">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="rounded-full border-2 border-black h-20 w-20 flex justify-center items-center" aria-label="Camera Icon">
            <UserPen className="h-10 w-10" />
          </div>
          <h2 className="font-semibold text-3xl">Photos of you</h2>
        </div>

        <div className="flex flex-col justify-center items-center ">
          <div className="flex flex-col justify-center items-center">
            <p>When people tag you in photos, they ll appear here..</p>
          </div>
        </div>
      </div>
      <div className="text-gray-500 text-xs flex flex-col gap-4 mt-20">
        <p className="flex justify-center ">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p className="flex justify-center">© 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};
export default Tagged;
