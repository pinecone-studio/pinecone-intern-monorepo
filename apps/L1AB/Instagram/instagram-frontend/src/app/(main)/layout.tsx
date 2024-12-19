'use client';
import { createContext, PropsWithChildren, Suspense, useEffect } from 'react';
import { LeftSideBar } from '@/components/LeftSideBar';
import { StoryProvider } from '@/components/providers/StoryProvider';
import RightSideBar from '@/components/RightSideBar';
import { SuggestCard } from '@/components/SuggestCard';
import { usePathname, useRouter } from 'next/navigation';
import { ApolloWrapper, ThemeProvider, UserProvider } from '@/components/providers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { NotificationProvider } from '@/components/providers/NotificationProvider';


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
    <div className=" h-full bg-[hsl(var(--background-main))] root:text-[hsl(var(--foreground))] dark:bg-[hsl(var(--background-main))]">
      <UserProvider>
        <div className="flex min-w-full ">
          <ThemeProvider attribute="class" defaultTheme="dark">
            <StoryProvider>
              <NotificationProvider>
                {pathname.includes('/story') ? null : <LeftSideBar />}
                <div className="flex gap-[72px] mx-auto max-h-screen">
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
              </NotificationProvider>
            </StoryProvider>
          </ThemeProvider>
        </div>
      </UserProvider>
    </div>
  );
};

export default HomeLayout;
