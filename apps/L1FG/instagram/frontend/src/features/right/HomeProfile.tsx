'use client';
import { useAuth } from '@/components/providers/AuthProvider';
import HomeSuggestionCard from '@/features/follower-suggestion/HomeSuggestionCard';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const HomePageProfile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <div data-testid="user-bar" className="w-[326px] flex flex-col gap-4 pt-10">
      <div className="flex items-center justify-between w-full ">
        <button className="flex items-center gap-2">
          <Link href="/mystories">
            <div className="rounded-full w-fit bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)] p-[3px] mt-2">
              <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full overflow-hidden relative">
                  <Image src="/images/profilePic.png" alt="zurag orno" fill className="object-cover" />
                </div>
              </div>
            </div>
          </Link>

          <div onClick={() => router.push(`${user?._id}`)}>
            <h1 className="text-base font-bold text-gray-900">{user?.userName}</h1>
            <p className="text-sm text-gray-500 flex justify-start">{user?.fullName}</p>
          </div>
        </button>

        <div>
          <button data-testid="logout" onClick={() => logout()} className="text-[11px] font-bold text-[#0095F6]">
            Log out
          </button>
        </div>
      </div>
      <HomeSuggestionCard />
    </div>
  );
};

export default HomePageProfile;
