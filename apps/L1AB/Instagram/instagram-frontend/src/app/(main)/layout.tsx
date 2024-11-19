'use client';
import { PropsWithChildren, Suspense } from 'react';
import { ApolloWrapper } from '@/components/providers';
import { LeftSideBar } from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import { SuggestCard } from '@/components/SuggestCard';
import { usePathname } from 'next/navigation';

const HomeLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  return (
    <div className="flex min-w-full">
      <LeftSideBar />
      <div className="flex gap-[72px] mx-auto">
        <Suspense>
          <ApolloWrapper>
            <div>{children}</div>
          </ApolloWrapper>
        </Suspense>
        {pathname == '/home' ? (
          <div className="flex flex-col py-10 gap-y-4">
            <RightSideBar />
            <SuggestCard />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomeLayout;
