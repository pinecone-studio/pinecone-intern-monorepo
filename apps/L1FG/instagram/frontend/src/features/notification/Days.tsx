'use client';
import { ThisWeek } from '@/features/notification/ThisWeek';
import { Today } from './Today';
import { NotificationCategory, useGetNotificationQuery } from '@/generated';
import { Earlier } from '@/features/notification/Earlier';
import { ThisMonth } from './ThisMonth';

// eslint-disable-next-line complexity
export const Days = () => {
  const { data } = useGetNotificationQuery({
    // pollInterval: 500,
    // fetchPolicy: 'cache-and-network',
  });
  if (!data?.getNotification) return <div data-testid="data-obso"></div>;

  return (
    <div data-testid="days" className="overflow-y-auto h-[calc(100vh-60px)]">
      {data.getNotification.today && <Today data-testid="today" notifications={data?.getNotification?.today as NotificationCategory} />}
      {data?.getNotification.thisWeek && <ThisWeek data-testid="thisWeek" notifications={data?.getNotification.thisWeek as NotificationCategory} />}
      {data?.getNotification.thisWeek && <ThisMonth data-testid="thisWeek" notifications={data?.getNotification.thisWeek as NotificationCategory} />}
      {data?.getNotification.earlier && <Earlier data-testid="earlier" notifications={data?.getNotification?.earlier as NotificationCategory} />}
    </div>
  );
};
