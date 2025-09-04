'use client';

import { useEffect } from 'react';

export const useSelectedChatLoader = (selectedUser: any, data: any, fetchChat: any, setChatLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) => {
  useEffect(() => {
    if (!selectedUser || !data?.getMe?.id) return;

    const matchId = selectedUser.id;
    const userId = data.getMe.id;
    const participantId = data.getMe.matchIds?.find((m: any) => m?.id === matchId)?.matchedUser?.id;

    if (!participantId) return;

    setChatLoading((prev) => ({ ...prev, [matchId]: true }));

    fetchChat({
      variables: { userId, participantId },
      fetchPolicy: 'cache-first',
    }).finally(() => {
      setChatLoading((prev) => ({ ...prev, [matchId]: false }));
    });
  }, [selectedUser, data, fetchChat, setChatLoading]);
};

 