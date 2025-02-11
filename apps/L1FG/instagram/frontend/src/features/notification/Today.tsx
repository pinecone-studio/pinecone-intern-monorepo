import { NotificationCategory } from '@/generated';
import { LikedPost } from '../../components/notifications/LikedPost';
import { RequestFollow } from './RequestFollow';
import { CommentPost } from '../../components/notifications/CommentPost';

type Props = {
  notifications?: NotificationCategory;
};

export const Today = ({ notifications }: Props) => {
  return (
    <div className="border-b">
      <h2 data-testid="today" className="font-bold px-6 mt-[22px] mb-[18px]">
        Today
      </h2>
      {notifications?.postLike && <LikedPost data-testid="like-post" likeNotification={notifications.postLike as []} />}
      {notifications?.request && <RequestFollow data-testid="request-follow" reqNotification={notifications.request as []} />}
      {notifications?.comment && <CommentPost data-testid="comment-post" commentNotification={notifications.comment as []} />}
    </div>
  );
};
