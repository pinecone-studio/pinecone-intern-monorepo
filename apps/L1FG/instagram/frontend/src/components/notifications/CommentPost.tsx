'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { NotificationType, UserPostType } from '@/generated';
import PostModal from '../profile/profilePost/PostModal';
import { formatDistanceToNowStrict } from 'date-fns';
import Link from 'next/link';

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
      contentPost: likes[0]?.contentPost,
      userImage: latestLikes[latestLikes.length - 1]?.user?.profileImage,
      contentComment: latestLikes[latestLikes.length - 1]?.contentComment,
      userIds: latestLikes.map((like) => like.user?._id),
      date: likes[0].createdAt,
    };
  });

  return (
    <div>
      {groupedNotifications.map((n) => (
        <div key={n.postId} className="justify-between flex items-center mt-4 h-[52px] py-2 px-4 mb-2">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={n?.userImage} alt="User Avatar" />
            </Avatar>
            <div className="ml-4 text-sm w-[243px] break-words  ">
              <Link href={`/${n.userIds}`}>
                <span className="font-bold">{n.userNames[0]}</span>
                <span className="px-1 ">commented: </span>
                <span> {n.contentComment} </span>
                <span className="text-gray-500">
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
              </Link>
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
