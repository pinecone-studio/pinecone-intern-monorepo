'use client';
import { useGetAllUsersQuery, useGetFollowersByIdQuery, useGetUserByIdQuery } from '@/generated';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

interface UserContextType {
  user: any;
  users: any;
  followers: any;
  sortedUsers: any;
}
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useState();
  useEffect(() => {
    const userId = localStorage.getItem('userToken');
    setUserId(userId as any);
  }, []);

  const getUserById = useGetUserByIdQuery({ variables: { id: userId as any } });
  const user = getUserById.data?.getUserById;

  const getAllUsers = useGetAllUsersQuery();
  const users = getAllUsers.data?.getAllUsers;

  const getFollowersById = useGetFollowersByIdQuery({ variables: { id: userId as any } });
  const followers = getFollowersById?.data?.getFollowersById;

  const sortedUsers = users?.filter((el) => el._id !== userId);

  return <UserContext.Provider value={{ user, users, followers, sortedUsers }}>{children}</UserContext.Provider>;
};
