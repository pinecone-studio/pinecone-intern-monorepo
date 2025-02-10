import { NotificationCategory } from '@/generated';
import { RequestFollow } from '../../features/notification/RequestFollow';
import { LikedPost } from '@/components/notifications/LikedPost';
import { CommentPost } from '@/components/notifications/CommentPost';

type Props = {
  notifications?: NotificationCategory;
};

export const ThisWeek = ({ notifications }: Props) => {
  return (
    <div className="border-b">
      <h2 className="font-bold px-6 mt-[22px] mb-[18px]">This week</h2>
      {notifications?.postLike && <LikedPost likeNotification={notifications.postLike as []} />}
      {notifications?.request && <RequestFollow reqNotification={notifications.request as []} />}
      {notifications?.comment && <CommentPost commentNotification={notifications.comment as []} />}
    </div>
  );
};
