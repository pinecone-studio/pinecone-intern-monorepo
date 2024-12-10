'use client';
import { createContext, PropsWithChildren, Suspense, useEffect } from 'react';
import { LeftSideBar } from '@/components/LeftSideBar';
import { StoryProvider } from '@/components/providers/StoryProvider';
import RightSideBar from '@/components/RightSideBar';
import { SuggestCard } from '@/components/SuggestCard';
import { usePathname, useRouter } from 'next/navigation';

import { ApolloWrapper, UserProvider } from '@/components/providers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
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
        <StoryProvider>
          {pathname.includes('/story') ? null : <LeftSideBar />}

          <div className="flex gap-[72px] mx-auto">
            <div className="flex min-w-full">
              <div className="flex gap-[72px] mx-auto">
                <Suspense>
                  <ApolloWrapper>
                    <NuqsAdapter>{children}</NuqsAdapter>
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
          </div>
        </StoryProvider>
      </div>
    </UserProvider>
  );
};

export default HomeLayout;
