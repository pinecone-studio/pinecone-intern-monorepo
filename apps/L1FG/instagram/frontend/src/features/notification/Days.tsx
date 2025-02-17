'use client';
import { ThisWeek } from '@/features/notification/ThisWeek';
import { Today } from './Today';
import { NotificationCategory, useGetNotificationQuery } from '@/generated';
import { Earlier } from '@/features/notification/Earlier';
import { ThisMonth } from './ThisMonth';
import ActivityCard from '@/components/notifications/ActivityCard';
import { LoadingNotification } from '@/components/notifications/LoadingNotification';

// eslint-disable-next-line complexity
export const Days = () => {
  const { data, loading } = useGetNotificationQuery({
    // pollInterval: 500,
    // fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <LoadingNotification />;
  }

  if (!data?.getNotification?.today && !data?.getNotification?.thisWeek && !data?.getNotification?.thisMonth && !data?.getNotification?.earlier)
    return (
      <div data-testid="data-obso">
        <ActivityCard />
      </div>
    );

  return (
    <div data-testid="days" className="overflow-y-auto h-[calc(100vh-60px)]">
      {data.getNotification.today && <Today data-testid="today" notifications={data?.getNotification?.today as NotificationCategory} />}
      {data?.getNotification.thisWeek && <ThisWeek data-testid="thisWeek" notifications={data?.getNotification.thisWeek as NotificationCategory} />}
      {data?.getNotification.thisMonth && <ThisMonth data-testid="thisWeek" notifications={data?.getNotification.thisWeek as NotificationCategory} />}
      {data?.getNotification.earlier && <Earlier data-testid="earlier" notifications={data?.getNotification?.earlier as NotificationCategory} />}
    </div>
  );
};
