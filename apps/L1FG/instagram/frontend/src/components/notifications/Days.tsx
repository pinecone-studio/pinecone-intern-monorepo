'use client';
import { ThisWeek } from '@/features/notification/ThisWeek';
import { Today } from '../../features/notification/Today';
import { NotificationCategory, useGetNotificationQuery } from '@/generated';
import { Earlier } from '@/features/notification/Earlier';

export const Days = () => {
  const { data } = useGetNotificationQuery({
    pollInterval: 500,
  });

  console.log(data);

  if (!data?.getNotification) return <div data-testid="data-obso">data obso</div>;

  return (
    <div className="overflow-y-auto h-[calc(100vh-60px)]">
      {data?.getNotification.today && <Today data-testid="today" notifications={data?.getNotification?.today as NotificationCategory} />}
      {data?.getNotification.thisWeek && <ThisWeek data-testid="thisWeek" notifications={data?.getNotification.thisWeek as NotificationCategory} />}
      {data?.getNotification.earlier && <Earlier data-testid="earlier" notifications={data?.getNotification?.earlier as NotificationCategory} />}
    </div>
  );
};
