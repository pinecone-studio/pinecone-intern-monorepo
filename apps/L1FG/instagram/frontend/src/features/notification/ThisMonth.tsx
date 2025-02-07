import { NotificationCategory } from '@/generated';
import { RequestFollow } from '../../features/notification/RequestFollow';
import { LikedPost } from '@/components/notifications/LikedPost';
import { CommentPost } from '@/components/notifications/CommentPost';

type Props = {
  notifications?: NotificationCategory;
};

export const ThisMonth = ({ notifications }: Props) => {
  return (
    <div className="border-b">
      <h2 className="font-bold px-6 mt-[22px] mb-[18px]">This month</h2>
      {notifications?.postLike && <LikedPost data-testid="like-post" likeNotification={notifications.postLike as []} />}
      {notifications?.request && <RequestFollow data-testid="request-follow" reqNotification={notifications.request as []} />}
      {notifications?.comment && <CommentPost data-testid="comment-post" commentNotification={notifications.comment as []} />}
    </div>
  );
};
