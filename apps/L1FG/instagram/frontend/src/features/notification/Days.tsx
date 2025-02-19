'use client';
import { ThisWeek } from '@/features/notification/ThisWeek';
import { Today } from './Today';
import { NotificationCategory, NotificationResponseType } from '@/generated';
import { Earlier } from '@/features/notification/Earlier';
import { ThisMonth } from './ThisMonth';
import ActivityCard from '@/components/notifications/ActivityCard';
import { LoadingNotification } from '@/components/notifications/LoadingNotification';

// eslint-disable-next-line complexity
export const Days = ({ data, loading }: { data: NotificationResponseType; loading: boolean }) => {
  if (loading) {
    return <LoadingNotification />;
  }

  if (!data?.today && !data?.thisWeek && !data?.thisMonth && !data?.earlier)
    return (
      <div data-testid="data-obso">
        <ActivityCard />
      </div>
    );

  return (
    <div data-testid="days" className="overflow-y-auto h-[calc(100vh-60px)]">
      {data?.today && <Today data-testid="today" notifications={data?.today as NotificationCategory} />}
      {data?.thisWeek && <ThisWeek data-testid="thisWeek" notifications={data?.thisWeek as NotificationCategory} />}
      {data?.thisMonth && <ThisMonth data-testid="thisWeek" notifications={data?.thisWeek as NotificationCategory} />}
      {data?.earlier && <Earlier data-testid="earlier" notifications={data?.earlier as NotificationCategory} />}
    </div>
  );
};
