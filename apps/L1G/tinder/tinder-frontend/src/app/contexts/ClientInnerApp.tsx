'use client';

import { PropsWithChildren } from 'react';

import Loading from '@/components/Loading';
import { useCurrentUser } from './CurrentUserContext';
import { SocketProvider } from './SocketContext';

const ClientInnerApp = ({ children }: PropsWithChildren) => {
  const { currentUser, loading: userLoading, error: userError } = useCurrentUser();

  if (userLoading) return <Loading msg="Please wait..." />;

  if (userError || !currentUser) return <div>Error loading user data.</div>;

  return (
    <SocketProvider userId={currentUser.id} matchIds={currentUser.matchIds?.map((m) => m.id) ?? []}>
      {children}
    </SocketProvider>
  );
};

export default ClientInnerApp;
