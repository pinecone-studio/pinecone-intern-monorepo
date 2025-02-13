'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { NotificationType } from '@/generated';

type Props = {
  commentNotification: NotificationType[];
};

export const CommentPost = ({ commentNotification }: Props) => {
  const groupedPostLikes = commentNotification?.reduce((acc, notification) => {
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
      postImage: likes[0]?.contentPost ?? '',
      userImage: latestLikes[latestLikes.length - 1]?.user?.profileImage,
      contentComment: latestLikes[latestLikes.length - 1]?.contentComment,
      userIds: latestLikes.map((like) => like.user?._id),
    };
  });

  return (
    <div>
      {groupedNotifications.map((n) => (
        <div key={n.postId} className="justify-between flex items-center mt-4 h-[52px] py-2 px-6 mb-2">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={n?.userImage} alt="User Avatar" />
            </Avatar>
            <div className="ml-4 text-sm w-[243px] break-words  ">
              <span className="font-bold">
                <a href={`/${n.userIds[0]}`}>{n.userNames[0]}</a>
              </span>
              <span className="px-1 ">commented:</span>
              <span> {n.contentComment}</span>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${n.postImage})`,
              width: '44px',
              height: '44px',
              backgroundPosition: 'center',
            }}
            className="rounded-sm bg-cover "
          ></div>
        </div>
      ))}
    </div>
  );
};
