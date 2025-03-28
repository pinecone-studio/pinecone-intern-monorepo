import { NotificationCategory } from '@/generated';
import { RequestFollow } from './RequestFollow';
import { CommentPost } from '../../components/notifications/CommentPost';
import { LikedPost } from '@/components/notifications/LikedPost';
import { CommentLike } from '@/components/notifications/CommentLike';
import { useAuth } from '@/components/providers/AuthProvider';

type Props = {
  notifications?: NotificationCategory;
};

// eslint-disable-next-line complexity
export const ThisMonth = ({ notifications }: Props) => {
  const { setNotification } = useAuth();
  if (!notifications) return null;

  const allNotifications = [...(notifications.comment || []), ...(notifications.postLike || []), ...(notifications.request || []), ...(notifications.commentLike || [])];

  const sortedNotifications = allNotifications?.sort((a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime());
  const hasUnreadNotifications = allNotifications.some((notification) => notification?.isRead);

  if (!hasUnreadNotifications) {
    setNotification(true);
  }

  return (
    <div className="border-b">
      <h2 data-testid="today" className="font-bold px-6 mt-[22px] mb-[18px]">
        This Month
      </h2>

      {sortedNotifications.map((notification, i) => {
        if (notification?.categoryType === 'POST_COMMENT') {
          return <CommentPost key={i} commentNotification={[notification]} />;
        } else if (notification?.categoryType === 'POST_LIKE') {
          return <LikedPost key={i} likeNotification={[notification]} />;
        } else if (notification?.categoryType === 'REQUEST') {
          return <RequestFollow key={i} reqNotification={[notification]} />;
        } else if (notification?.categoryType === 'COMMENT_LIKE') {
          return <CommentLike key={i} commentNotification={[notification]} />;
        }
        return null;
      })}
    </div>
  );
};
