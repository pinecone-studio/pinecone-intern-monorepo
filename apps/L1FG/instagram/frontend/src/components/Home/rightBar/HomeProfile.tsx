'use client';
import { useAuth } from '@/components/providers/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';

const HomePageProfile = () => {
  const { user } = useAuth();
  return (
    <div data-testid="user-bar" className="w-[326px] flex flex-col gap-4 pt-10">
      <div className="flex items-center justify-between w-full ">
        <div className="flex items-center gap-2">
          <Link href="/mystories">
            <div className="rounded-full w-fit bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)] p-[3px] mt-2">
              <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full overflow-hidden relative">
                  <Image src="/images/profilePic.png" alt="zurag orno" fill className="object-cover" />
                </div>
              </div>
            </div>
          </Link>

          <div>
            <h1 className="text-sm font-bold ">{user?.userName}</h1>
            <p className="text-sm text-[#8E8E8E]">{user?.fullName}</p>
          </div>
        </div>

        <div>
          <button className="text-[11px] font-bold text-[#0095F6]">Log out</button>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <p className="text-[#8E8E8E] font-semibold text-sm">Suggested for you</p>
        <Link href="/home/suggestuser" className="text-[#262626] text-xs font-semibold ">
          See All
        </Link>
      </div>

      <div className="text-[#C7C7C7] text-wrap text-xs flex flex-col gap-4 mt-8">
        <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p>© 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default HomePageProfile;
