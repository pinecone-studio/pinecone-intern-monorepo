import { NotificationCategory } from '@/generated';
import { RequestFollow } from './RequestFollow';
import { CommentPost } from '../../components/notifications/CommentPost';
import { CommentLike } from '@/components/notifications/CommentLike';
import { LikedPost } from '@/components/notifications/LikedPost';

type Props = {
  notifications?: NotificationCategory;
};

// eslint-disable-next-line complexity
export const Today = ({ notifications }: Props) => {
  if (!notifications) return null;

  const allNotifications = [...(notifications.comment || []), ...(notifications.postLike || []), ...(notifications.request || []), ...(notifications.commentLike || [])];

  const sortedNotifications = allNotifications?.sort((a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime());

  return (
    <div className="border-b">
      <h2 data-testid="today" className="font-bold px-6 mt-[22px] mb-[18px]">
        Today
      </h2>

      {sortedNotifications.map((notification, i) => {
        if (notification?.categoryType === 'COMMENT_LIKE') {
          return <CommentLike key={i} commentNotification={[notification]} />;
        }
        if (notification?.categoryType === 'POST_COMMENT') {
          return <CommentPost key={i} commentNotification={[notification]} />;
        }
        if (notification?.categoryType === 'POST_LIKE') {
          return <LikedPost key={i} likeNotification={[notification]} />;
        }
        if (notification?.categoryType === 'REQUEST') {
          return <RequestFollow key={i} reqNotification={[notification]} />;
        }

        return null;
      })}
    </div>
  );
};
