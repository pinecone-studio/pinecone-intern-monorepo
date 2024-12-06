'use client';
import { useGetAllUsersQuery, useGetFollowersByIdQuery, useGetFollowingByIdQuery, useGetUserByIdQuery } from '@/generated';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { decodeToken } from '../utils/decode-utils';

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
    const userToken = localStorage.getItem('userToken');
    const user = decodeToken(userToken as string);
    setUserId(user.id);
  }, []);

  const getUserById = useGetUserByIdQuery({ variables: { id: userId as any } });
  const user = getUserById.data?.getUserById;

  const getAllUsers = useGetAllUsersQuery();
  const users = getAllUsers.data?.getAllUsers;

  const getFollowersById = useGetFollowersByIdQuery({ variables: { id: userId as any } });
  const followers = getFollowersById?.data?.getFollowersById;

  const getFollowingById = useGetFollowingByIdQuery({ variables: { id: userId as any } });
  const following = getFollowingById?.data?.getFollowingById;

  const sortedUsers = _.filter(users, (user) => {
    return !following?.some((follow) => follow._id === user._id) && user._id !== userId;
  });

  return <UserContext.Provider value={{ user, users, followers, sortedUsers }}>{children}</UserContext.Provider>;
};
