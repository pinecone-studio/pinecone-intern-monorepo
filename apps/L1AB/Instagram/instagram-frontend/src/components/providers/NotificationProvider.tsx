'use client';
import { useGetNotificationsByUserIdQuery } from '@/generated';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useUser } from './UserProvider';
type NotificationContextType = {
  isNotifyNew: boolean | null;
  setIsNotifyNew: (_value: boolean) => void;
};
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [isNotifyNew, setIsNotifyNew] = useState(false);
  const [now, setNow] = useState('');
  const { user } = useUser();
  const { data } = useGetNotificationsByUserIdQuery({
    variables: {
      userId: user ? user._id : '',
    },
  });
  const notifyData = data?.getNotificationsByUserId;

  useEffect(() => {
    const nowTime = localStorage.getItem('now');
    let currentNow;

    if (!nowTime) {
      const now = new Date();
      currentNow = now.toISOString();
      localStorage.setItem('now', currentNow);
    } else {
      currentNow = nowTime;
    }

    setNow(currentNow);

    const filteredData = notifyData?.filter((el) => {
      const elDate = new Date(el.createdAt);
      const nowDate = new Date(now);
      return elDate > nowDate;
    });

    if (filteredData && filteredData?.length > 0) {
      setIsNotifyNew(true);
    } else return;
  }, [data]);

  return <NotificationContext.Provider value={{ isNotifyNew, setIsNotifyNew }}>{children}</NotificationContext.Provider>;
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  return context;
};
