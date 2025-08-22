'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetMeLazyQuery } from '@/generated';

type CurrentUser = {
  id: string;
  email: string;
  name?: string | null;
  bio?: string | null;
  gender?: string | null;
  genderPreferences?: string | null;
  profession?: string | null;
  schoolWork?: string | null;
  images?: (string | null)[] | null;
  dateOfBirth?: string | null;
  likedBy?: { id: string; email: string }[] | null;
  likedTo?: { id: string; email: string }[] | null;
  matchIds?:
    | {
        id: string;
        matchedAt: string;
        unmatched?: boolean;
      }[]
    | null;
};

type CurrentUserContextType = {
  currentUser: CurrentUser | null;
  loading: boolean;
  error: Error | null;
};

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  loading: true,
  error: null,
});

export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [getMe, { data, loading, error }] = useGetMeLazyQuery();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    if (data?.getMe) {
      const u = data.getMe;

      const cleanedUser: CurrentUser = {
        id: u.id,
        email: u.email,
        name: u.name ?? null,
        bio: u.bio ?? null,
        gender: u.gender ?? null,
        genderPreferences: u.genderPreferences ?? null,
        profession: u.profession ?? null,
        schoolWork: u.schoolWork ?? null,
        images: u.images ?? null,
        dateOfBirth: u.dateOfBirth ?? null,
        likedBy: (u.likedBy?.filter(Boolean) as { id: string; email: string }[]) ?? null,
        likedTo: (u.likedTo?.filter(Boolean) as { id: string; email: string }[]) ?? null,
        matchIds:
          u.matchIds?.filter(Boolean).map((m) => ({
            id: m!.id,
            matchedAt: m!.matchedAt,
            unmatched: m!.unmatched,
          })) ?? null,
      };

      setCurrentUser(cleanedUser);
    }
  }, [data]);

  return <CurrentUserContext.Provider value={{ currentUser, loading, error: error as Error | null }}>{children}</CurrentUserContext.Provider>;
};
