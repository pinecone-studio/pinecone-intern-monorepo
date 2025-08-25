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

  const cleanMatches = (matches: any[] | undefined) => {
    if (!matches) return null;
    return matches.filter(Boolean).map((m) => ({
      id: m.id,
      matchedAt: m.matchedAt,
      unmatched: m.unmatched,
    }));
  };

  const cleanUserArray = (users: any[] | undefined) => {
    if (!users) return null;
    return users.filter(Boolean).map((u) => ({
      id: u.id,
      email: u.email,
    }));
  };

  const cleanBasicInfo = (u: any) => ({
    name: u.name ?? null,
    bio: u.bio ?? null,
    dateOfBirth: u.dateOfBirth ?? null,
  });

  const cleanPreferences = (u: any) => ({
    gender: u.gender ?? null,
    genderPreferences: u.genderPreferences ?? null,
  });

  const cleanExtras = (u: any) => ({
    profession: u.profession ?? null,
    schoolWork: u.schoolWork ?? null,
    images: u.images ?? null,
  });

  const cleanProfileInfo = (u: any) => ({
    ...cleanBasicInfo(u),
    ...cleanPreferences(u),
    ...cleanExtras(u),
  });

  const cleanRelations = (u: any) => ({
    likedBy: cleanUserArray(u.likedBy),
    likedTo: cleanUserArray(u.likedTo),
    matchIds: cleanMatches(u.matchIds),
  });

  const cleanUserData = (u: any): CurrentUser => ({
    id: u.id,
    email: u.email,
    ...cleanProfileInfo(u),
    ...cleanRelations(u),
  });

  useEffect(() => {
    if (data?.getMe) {
      setCurrentUser(cleanUserData(data.getMe));
    }
  }, [data]);

  return <CurrentUserContext.Provider value={{ currentUser, loading, error: error as Error | null }}>{children}</CurrentUserContext.Provider>;
};
