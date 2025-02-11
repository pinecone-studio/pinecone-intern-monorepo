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
      userImage: latestLikes[latestLikes.length - 2]?.user?.profileImage,
      userId: latestLikes.map((like) => like.user?._id),
    };
  });

  return (
    <div>
      {groupedNotifications.map((n) => (
        <div key={n.postId} className="justify-between flex items-center mt-4 h-[52px] py-2 px-6 mb-2">
          <div className="flex">
            <div className="relative w-[54px] h-[32px]">
              <Avatar className="absolute left-0 top-0 bottom-2 w-8 h-8 border-2 border-white">
                <AvatarImage src={n.userImage} alt="@shadcn" />
              </Avatar>
              <Avatar className="absolute left-4 top-2 w-8 h-8 border-2 border-white">
                <AvatarImage src={n.userImage} alt="@user2" />
              </Avatar>
            </div>
            <div className="w-[194px] ml-2 items-center flex text-sm">
              <a className="font-bold mr-2 text-sm" href={`${n.userId[0]}`}>
                {n.userNames[0]}
              </a>
              <a className="font-bold mr-2 text-sm" href={`${n.userId[1]}`}>
                , {n.userNames[1]}
              </a>
              <p className="text-sm"> liked your post</p>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${n.postImage})`,
              width: '44px',
              height: '44px',
              backgroundPosition: 'center',
            }}
            className="rounded-sm bg-cover"
          ></div>
        </div>
      ))}
    </div>
  );
};
