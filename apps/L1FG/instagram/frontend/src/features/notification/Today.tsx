import { NotificationCategory } from '@/generated';
import { LikedPost } from '../../components/notifications/LikedPost';
import { RequestFollow } from './RequestFollow';
import { CommentPost } from '../../components/notifications/CommentPost';

type Props = {
  notifications?: NotificationCategory;
};

export const Today = ({ notifications }: Props) => {
  if (!notifications) return null;

  // Бүх notification-уудыг нэг массивт нэгтгэх
  const allNotifications = [...(notifications.comment || []), ...(notifications.postLike || []), ...(notifications.request || [])];

  // `createdAt`-аар эрэмбэлэх (шинэ нь эхэнд)
  const sortedNotifications = allNotifications?.sort((a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime());
  console.log('today', sortedNotifications);

  return (
    <div className="border-b">
      <h2 data-testid="today" className="font-bold px-6 mt-[22px] mb-[18px]">
        Today
      </h2>

      {sortedNotifications.map((notification) => {
        if (notification?.categoryType === 'POST_COMMENT') {
          return <CommentPost key={notification?.id} commentNotification={[notification]} />;
        } else if (notification?.categoryType === 'POST_LIKE') {
          return <LikedPost key={notification?.id} likeNotification={[notification]} />;
        } else if (notification?.categoryType === 'REQUEST') {
          return <RequestFollow key={notification.id} reqNotification={[notification]} />;
        }
        return null;
      })}
    </div>
  );
};
