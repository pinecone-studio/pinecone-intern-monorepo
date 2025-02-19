'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { NotificationType, UserPostType } from '@/generated';
import PostModal from '../profile/profilePost/PostModal';
import { formatDistanceToNowStrict } from 'date-fns';
import Link from 'next/link';

type Props = {
  likeNotification: NotificationType[];
};

export const LikedPost = ({ likeNotification }: Props) => {
  console.log('like', likeNotification);

  const groupedPostLikes = likeNotification?.reduce((acc, notification) => {
    const postId = notification.contentPostId;
    if (typeof postId !== 'string') return acc;

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
        <div key={index} className="flex items-center justify-between py-3 px-4  transition rounded-lg">
          <div className="flex items-center">
            <div className="relative w-10 h-10">
              {n.userImages.slice(0, 2).map((img, index) => (
                <Avatar key={index} className={` ${index >= 1 ? 'left-4 top-4 absolute w-[36px] h-[36px] border-2 border-white' : 'w-10 h-10'}`}>
                  <AvatarImage src={img} alt="User profile" />
                </Avatar>
              ))}
            </div>

            <div className="ml-4 text-sm w-[243px]">
              <Link href={`/${n.userIds}`}>
                <span className="font-bold">{n.userNames[0]}</span>
                {n.userNames.length > 1 && <span className="font-bold">{n.userNames[1]}</span>}
                <span> liked your post. </span>
                <span className="text-gray-500 font-normal">
                  {formatDistanceToNowStrict(n.date, { addSuffix: false })
                    .replace(' seconds', 's')
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
