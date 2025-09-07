'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
  refetch: () => void;
};

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  loading: true,
  error: null,
  refetch: () => {},
});

export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [getMe, { data, loading, error, refetch }] = useGetMeLazyQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const handleRefetch = useCallback(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  // Socket setup effect
  useEffect(() => {
    let isMounted = true;
    let eventCleanup: (() => void) | null = null;

    const setupSocket = async (): Promise<void> => {
      try {
        await connectSocket();

        const handleMatchCreated = (rawMatchData: any) => {
          console.log('[SOCKET] match_created received:', rawMatchData);

          if (!isMounted) return;

          const matchId = rawMatchData.matchId || rawMatchData.id;
          const matchedUser = rawMatchData.matchedUser;

          if (!matchId || !matchedUser) {
            console.warn('Invalid match data received:', rawMatchData);
            return;
          }

          const transformedMatch = {
            id: matchId,
            matchedAt: rawMatchData.timestamp || new Date().toISOString(),
            unmatched: false,
            startedConversation: false,
            matchedUser: {
              id: matchedUser.id,
              name: matchedUser.name || null,
              images: matchedUser.images || null,
              dateOfBirth: matchedUser.dateOfBirth || null,
              profession: matchedUser.profession || null,
            },
          };

          setCurrentUser((prev) => {
            if (!prev) return prev;

            const existingMatchIndex = prev.matchIds?.findIndex((m) => m.id === matchId);

            if (existingMatchIndex !== undefined && existingMatchIndex !== -1) {
              console.log('Match already exists, skipping duplicate');
              return prev;
            }

            return {
              ...prev,
              matchIds: [...(prev.matchIds || []), transformedMatch],
            };
          });

          setTimeout(() => {
            handleRefetch();
          }, 1000);
        };

        const handleMatchRemoved = (data: any) => {
          console.log('[SOCKET] match_removed received:', data);

          if (!isMounted) return;

          const matchId = data.matchId || data.id;
          if (!matchId) return;

          setCurrentUser((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              matchIds: prev.matchIds?.filter((m) => m.id !== matchId) || null,
            };
          });

          setTimeout(() => {
            handleRefetch();
          }, 1000);
        };

        const handleProfileUpdated = (updatedData: any) => {
          console.log('[SOCKET] profile_updated received:', updatedData);

          if (!isMounted) return;
          setCurrentUser((prev) => {
            if (!prev) return prev;
            return { ...prev, ...updatedData };
          });

          handleRefetch();
        };

        const handleUserStatusChanged = (data: any) => {
          console.log('[SOCKET] user_status_changed received:', data);
        };

        socket.on('match_created', handleMatchCreated);
        socket.on('match_removed', handleMatchRemoved);
        socket.on('profile_updated', handleProfileUpdated);
        socket.on('user_status_changed', handleUserStatusChanged);

        eventCleanup = () => {
          socket.off('match_created', handleMatchCreated);
          socket.off('match_removed', handleMatchRemoved);
          socket.off('profile_updated', handleProfileUpdated);
          socket.off('user_status_changed', handleUserStatusChanged);
        };
      } catch (err) {
        console.error('Error connecting socket in CurrentUserProvider:', err);
      }
    };

    setupSocket();

    return () => {
      isMounted = false;
      if (eventCleanup) {
        eventCleanup();
      }
    };
  }, [handleRefetch]);

  // Authentication effect
  useEffect(() => {
    if (!currentUser) {
      return; // Explicitly return void when no cleanup needed
    }

    const authenticateUser = (): void => {
      const authData = {
        userId: currentUser.id,
        matchIds: currentUser.matchIds?.map((m) => m.id) || [],
        currentPage: 'home',
      };

      socket.emit('authenticate', authData);
      console.log('Authenticated user via socket:', currentUser.id, authData);
    };

    if (socket.connected) {
      authenticateUser();
      return; // Explicitly return void
    } else {
      const handleConnect = (): void => {
        authenticateUser();
      };

      socket.on('connect', handleConnect);

      return (): void => {
        socket.off('connect', handleConnect);
      };
    }
  }, [currentUser]);

  // Data cleaning utility functions
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

  // Data synchronization effect
  useEffect(() => {
    if (data?.getMe) {
      const cleanedData = cleanUserData(data.getMe);
      console.log('Updated current user from GraphQL:', cleanedData);
      setCurrentUser(cleanedData);
    }
  }, [data]);

  // Periodic refetch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        handleRefetch();
      }
    }, 30000);

    return (): void => {
      clearInterval(interval);
    };
  }, [handleRefetch]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        loading,
        error: error as Error | null,
        refetch: handleRefetch,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
