'use client';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { LeftSideBar } from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import { SuggestCard } from '@/components/SuggestCard';
import { usePathname, useRouter } from 'next/navigation';
import { decodeToken } from '@/components/utils/decode-utils';
import { useGetAllUsersQuery } from '@/generated';
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
  const [user, setUser] = useState<User | undefined>(undefined);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token: any = localStorage.getItem('userToken');
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    } else {
      router.push('/login');
    }
  }, []);

  const { data } = useGetAllUsersQuery();

  const users = data?.getAllUsers;
  return (
    <userContext.Provider value={{ user, users }}>
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
    </userContext.Provider>
  );
};

export default HomeLayout;
