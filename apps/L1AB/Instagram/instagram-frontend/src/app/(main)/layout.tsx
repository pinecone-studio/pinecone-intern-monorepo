'use client';
import { PropsWithChildren, useEffect } from 'react';
import { LeftSideBar } from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import { SuggestCard } from '@/components/SuggestCard';
import { usePathname, useRouter } from 'next/navigation';
import { UserProvider } from '@/components/providers';

const HomeLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const token: string | null = localStorage.getItem('userToken');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <UserProvider>
      <div className="flex min-w-full">
        <LeftSideBar />
        <div className="flex gap-[72px] mx-auto max-h-screen overflow-y-scroll">
          <div>{children}</div>
          {pathname == '/home' ? (
            <div className="flex flex-col py-10 gap-y-4">
              <RightSideBar />
              <SuggestCard />
            </div>
          ) : null}
        </div>
      </div>
    </UserProvider>
  );
};

export default HomeLayout;
