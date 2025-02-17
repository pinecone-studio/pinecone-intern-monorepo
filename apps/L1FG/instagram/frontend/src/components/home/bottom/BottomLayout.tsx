'use client';

import { HomeSVG } from '@/components/svg/HomeSvg';
import { SearchSVG } from '@/components/svg/SearchSvg';
import { UserSvg } from '@/components/svg/UserSvg';
import { SquarePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { Create } from '../left/Create';

export const BottomLayout = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="h-[48px] w-full bg-white fixed bottom-0 z-50 border-t flex items-center justify-center">
      <div className="flex w-[90%] max-w-[400px] items-center justify-between px-4">
        <button
          onClick={() => {
            router.push('/');
          }}
          className="h-6 w-6"
        >
          <HomeSVG />
        </button>

        <button
          onClick={() => {
            router.push('/explore');
          }}
          data-testid="search-button"
          className={` flex items-center gap-6  rounded-md text-sm font-medium hover:bg-accent  my-1 p-[12px]`}
        >
          <SearchSVG data-testid="search-svg" />
        </button>

        <Create>
          <button className={`flex items-center gap-6 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground my-1 p-[12px] w-full `}>
            <SquarePlus className="h-6 w-6" />
          </button>
        </Create>

        <button
          onClick={() => {
            router.push(`/${user?._id}`);
          }}
          className="h-6 w-6"
        >
          <UserSvg />
        </button>
      </div>
    </div>
  );
};
