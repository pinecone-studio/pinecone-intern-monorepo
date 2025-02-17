'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { NotificationType, UserPostType } from '@/generated';
import PostModal from '../../components/profile/profilePost/PostModal';
import { formatDistanceToNowStrict } from 'date-fns';

type Props = {
  commentNotification: NotificationType[];
};

export const CommentLike = ({ commentNotification }: Props) => {
  const groupedPostLikes = commentNotification?.reduce((acc, notification) => {
    const postId = notification.contentPostId;
    if (!postId) {
      return acc;
    }

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
      contentPost: likes[0].contentPost,
      userImages: latestLikes.map((like) => like.user?.profileImage),
      userIds: latestLikes.map((like) => like.user?._id),
      comment: latestLikes[0].contentComment,
      date: likes[0].createdAt,
    };
  });

  return (
    <div>
      {groupedNotifications?.map((n, index) => (
        <div key={index} className="flex items-center  justify-between py-3 px-6 hover:bg-gray-100 transition rounded-lg">
          <div className="flex  items-center">
            <div className="relative w-10 h-10">
              {n.userImages.slice(0, 2).map((img, index) => (
                <Avatar key={index} className={` ${index === 1 ? 'left-4 top-4 absolute w-[36px] h-[36px] border-2 border-white' : 'w-10 h-10'}`}>
                  <AvatarImage src={img} alt="User profile" />
                </Avatar>
              ))}
            </div>

            <div className="ml-4 text-sm w-[243px]">
              <span className="font-bold">
                <a href={`/${n.userIds[0]}`}>{n.userNames[0]}</a>
              </span>
              {n.userNames.length > 1 && (
                <span>
                  ,{' '}
                  <a className="font-bold" href={`/profile/${n.userIds[1]}`}>
                    {n.userNames[1]}
                  </a>
                </span>
              )}
              <span> liked your comment: {n.comment}</span>
              <span className="text-gray-500">
                {' '}
                {formatDistanceToNowStrict(n.date, { addSuffix: false })
                  .replace(' minutes', 'm')
                  .replace(' minute', 'm')
                  .replace(' hours', 'h')
                  .replace(' hour', 'h')
                  .replace(' days', 'd')
                  .replace(' day', 'd')
                  .replace(' weeks', 'w')
                  .replace(' week', 'w')
                  .replace(' months', 'mo')
                  .replace(' month', 'mo')
                  .replace(' years', 'y')
                  .replace(' year', 'y')}
              </span>
            </div>
          </div>
          <PostModal post={n.contentPost as UserPostType}>
            <div className="w-12 h-12 rounded-md bg-cover bg-center bg-red-400" style={{ backgroundImage: `url(${n.contentPost?.postImage[0]})` }}></div>
          </PostModal>
        </div>
      ))}
    </div>
  );
};
