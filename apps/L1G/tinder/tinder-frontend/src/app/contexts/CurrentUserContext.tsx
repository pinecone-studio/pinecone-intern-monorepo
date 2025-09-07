'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetMeLazyQuery } from '@/generated';
import socket, { connectSocket } from 'utils/socket';

export type MatchedUser = {
  id: string;
  images?: (string | null)[] | null;
  name?: string | null;
  dateOfBirth?: string | null;
  profession?: string | null;
};

export type CurrentUser = {
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
        startedConversation?: boolean;
        matchedUser: MatchedUser;
      }[]
    | null;
};

const cleanMatches = (matches: any[] | undefined) => {
  if (!matches) return null;
  return matches.filter(Boolean).map((m) => ({
    id: m.id,
    matchedAt: m.matchedAt,
    unmatched: m.unmatched,
    startedConversation: m.startedConversation,
    matchedUser: {
      id: m.matchedUser?.id ?? '',
      images: m.matchedUser?.images ?? null,
      name: m.matchedUser?.name ?? null,
      dateOfBirth: m.matchedUser?.dateOfBirth ?? null,
      profession: m.matchedUser?.profession ?? null,
    },
  }));
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
    let isMounted = true;

    const setupSocket = async () => {
      try {
        await connectSocket(); // ensures the socket is connected

        // Listener: when a new match is created
        const handleMatchCreated = (matchData: any) => {
          console.log('[SOCKET] match_created received:', matchData);

          if (!isMounted) return;
          setCurrentUser((prev) => (prev ? { ...prev, matchIds: [...(prev.matchIds || []), matchData] } : prev));
        };

        // Listener: when a match is removed (unmatch)
        const handleMatchRemoved = ({ matchId }: { matchId: string }) => {
          console.log('[SOCKET] match_removed received:', matchId);

          if (!isMounted) return;
          setCurrentUser((prev) =>
            prev
              ? {
                  ...prev,
                  matchIds: prev.matchIds?.filter((m) => m.id !== matchId),
                }
              : prev
          );
        };

        // Listener: profile updates (optional)
        const handleProfileUpdated = (updatedData: any) => {
          console.log('[SOCKET] profile_updated received:', updatedData);

          if (!isMounted) return;
          setCurrentUser((prev) => (prev ? { ...prev, ...updatedData } : prev));
        };

        socket.on('match_created', handleMatchCreated);
        socket.on('match_removed', handleMatchRemoved);
        socket.on('profile_updated', handleProfileUpdated);

        return () => {
          socket.off('match_created', handleMatchCreated);
          socket.off('match_removed', handleMatchRemoved);
          socket.off('profile_updated', handleProfileUpdated);
        };
      } catch (err) {
        console.error('❌ Error connecting socket in CurrentUserProvider:', err);
      }
    };

    setupSocket();

    return () => {
      isMounted = false;
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    socket.emit('authenticate', {
      userId: currentUser.id,
      matchIds: currentUser.matchIds?.map((m) => m.id) || [],
      currentPage: 'home',
    });

    console.log('🔐 Authenticated user via socket:', currentUser.id);
  }, [currentUser]);

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
