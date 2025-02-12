import { LikedPost } from '@/components/notifications/LikedPost';
import { NotificationCategory } from '@/generated';
import { RequestFollow } from './RequestFollow';
import { CommentPost } from '@/components/notifications/CommentPost';

type Props = {
  notifications?: NotificationCategory;
};
export const Earlier = ({ notifications }: Props) => {
  return (
    <div className="border-b">
      <h2 className="font-bold px-6 mt-[22px] mb-[18px]">Today</h2>
      {notifications?.postLike && <LikedPost likeNotification={notifications.postLike as []} />}
      {notifications?.request && <RequestFollow reqNotification={notifications.request as []} />}
      {notifications?.comment && <CommentPost commentNotification={notifications.comment as []} />}
    </div>
  );
};
