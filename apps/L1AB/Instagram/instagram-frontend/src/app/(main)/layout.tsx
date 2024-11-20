'use client';
import { createContext, PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { ApolloWrapper } from '@/components/providers';
import { LeftSideBar } from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import { SuggestCard } from '@/components/SuggestCard';
import { usePathname, useRouter } from 'next/navigation';
import { useGetUserByIdQuery } from '@/generated';

export const userContext = createContext<object | null>(null);

const HomeLayout = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    setUserId(id);
    if (!token || !id) {
      router.push('/login');
    }
  }, []);

  const { data } = useGetUserByIdQuery({
    variables: { id: userId || '' },
  });

  const user = data?.getUserById;

  return (
    <userContext.Provider value={{ user }}>
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
              <RightSideBar user={user} />
              <SuggestCard />
            </div>
          ) : null}
        </div>
      </div>
    </userContext.Provider>
  );
};

export default HomeLayout;
