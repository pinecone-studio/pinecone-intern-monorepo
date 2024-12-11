'use client';

import { useGetNotificationsByUserIdQuery } from '@/generated';
import { isToday, isYesterday, parseISO } from 'date-fns';
import { useUser } from './providers';
import TodayNotifications from './notificationComps/TodayNotifications';
import YesterdayNotifications from './notificationComps/YesterdayNotifications';
import EarlierNotifications from './notificationComps/EarlierNotifications';

const Notifications = () => {
  const { user } = useUser();
  const { data } = useGetNotificationsByUserIdQuery({
    variables: {
      userId: user ? user._id : '',
    },
  });
  const notifyData = data?.getNotificationsByUserId;

  const todayNotifications = notifyData?.filter((el) => isToday(parseISO(el?.createdAt))).reverse() || [];
  const yesterdayNotifications = notifyData?.filter((el) => isYesterday(parseISO(el?.createdAt))).reverse() || [];
  const earlierNotifications = notifyData?.filter((el) => !isToday(parseISO(el?.createdAt)) && !isYesterday(parseISO(el?.createdAt))).reverse() || [];

  return (
    <div className="space-y-5 flex flex-col gap-2">
      <TodayNotifications todayNotifications={todayNotifications} />
      <YesterdayNotifications yesterdayNotifications={yesterdayNotifications} />
      <EarlierNotifications earlierNotifications={earlierNotifications} />
    </div>
  );
};
export default Notifications;
