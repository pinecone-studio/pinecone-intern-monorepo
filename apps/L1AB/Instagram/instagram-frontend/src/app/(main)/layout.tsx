'use client';
import { createContext, PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { LeftSideBar } from '@/components/LeftSideBar';
import { StoryProvider } from '@/components/providers/StoryProvider';
import RightSideBar from '@/components/RightSideBar';
import { SuggestCard } from '@/components/SuggestCard';
import { usePathname, useRouter } from 'next/navigation';
import { decodeToken } from '@/components/utils/decode-utils';
import { useGetAllUsersQuery } from '@/generated';
import { ApolloWrapper } from '@/components/providers';
interface User {
  _id: string;
  email: string;
  username: string;
  fullname: string;
  gender: string;
  password: string;
  profilePicture: string;
  bio: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user: User | undefined;
  users: any;
}

export const userContext = createContext<UserContextType | undefined>(undefined);

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
        <div className="flex gap-[72px] mx-auto">
          <div className="flex min-w-full">
            <StoryProvider>
              {pathname.includes('/story') ? null : <LeftSideBar />}
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
            </StoryProvider>
          </div>
        </div>
      </div>
    </UserProvider>
  );
};

export default HomeLayout;
