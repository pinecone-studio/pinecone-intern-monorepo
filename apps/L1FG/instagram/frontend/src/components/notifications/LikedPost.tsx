'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { NotificationType } from '@/generated';

type Props = {
  likeNotification: NotificationType[];
};

export const LikedPost = ({ likeNotification }: Props) => {
  const groupedPostLikes = likeNotification?.reduce((acc, notification) => {
    const postId = notification.contentPostId;
    if (!postId) return acc;

    if (!acc[postId]) {
      acc[postId] = [];
    }

    acc[postId].push(notification);
    return acc;
  }, {} as Record<string, NotificationType[]>);

  const groupedNotifications = Object.entries(groupedPostLikes).map(([postId, likes]) => {
    const validLikes = likes.filter((like) => like.user?.userName);

    const latestLikes = validLikes.slice(-3);

    return {
      postId,
      userNames: latestLikes.map((like) => like.user?.userName),
      postImage: likes[0]?.contentPost,
      userImages: latestLikes.map((like) => like.user?.profileImage),
      userIds: latestLikes.map((like) => like.user?._id),
    };
  });

  return (
    <div>
      {groupedNotifications.map((n) => (
        <div key={n.postId} className="flex items-center  justify-between p-3 hover:bg-gray-100 transition rounded-lg">
          <div className="flex  items-center">
            <div className="relative w-10 h-10">
              {n.userImages.slice(0, 2).map((img, index) => (
                <Avatar key={index} className={`absolute w-8 h-8 border-2 border-white ${index === 1 ? 'left-4 top-2' : ''}`}>
                  <AvatarImage src={img} alt="User profile" />
                </Avatar>
              ))}
            </div>

            <div className="ml-6 text-sm w-[243px]">
              <span className="font-bold">
                <a href={`/profile/${n.userIds[0]}`}>{n.userNames[0]}</a>
              </span>
              {n.userNames.length > 1 && (
                <span>
                  ,{' '}
                  <a className="font-bold" href={`/profile/${n.userIds[1]}`}>
                    {n.userNames[1]}
                  </a>
                </span>
              )}
              {n.userNames.length > 2 && <span> and {n.userNames.length - 2} others</span>}
              <span> liked your post</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${n.postImage})` }}></div>
        </div>
      ))}
    </div>
  );
};
