'use client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { PostsEdge, useGetProfilePreviewLazyQuery } from '@/generated';
import { Avatar } from './Avatar';
import Image from 'next/image';
import { imageUrlOptimizer } from '../utils/image-url-optimizer';
import { FriendshipStatus } from '../../features/home-post/FriendshipStatus';
export const ProfileHover = ({ children, searchingUserId }: { children: React.ReactNode; searchingUserId: string }) => {
  const [getProfilePreview, { data, refetch }] = useGetProfilePreviewLazyQuery();
  return (
    <HoverCard>
      <HoverCardTrigger
        onMouseEnter={() => {
          getProfilePreview({
            variables: {
              searchingUserId: searchingUserId,
            },
          });
        }}
        data-testid="profile-hover-button"
      >
        {children}
      </HoverCardTrigger>
      <HoverCardContent>
        {data && (
          <div className="flex flex-col w-[200px]">
            <div className="flex gap-4 h-fit w-fit">
              <Avatar post={data.getProfilePreview.firstThreePosts[0] as PostsEdge} />
              <div className="flex flex-col">
                <p className="font-bold">{data.getProfilePreview.user?.userName}</p>
                <p>{data.getProfilePreview.user?.fullName}</p>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                <p className="font-bold">{data.getProfilePreview.user?.postCount}</p>
                <p>posts</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">{data.getProfilePreview.user?.followerCount}</p>
                <p>followers</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">{data.getProfilePreview.user?.followingCount}</p>
                <p>following</p>
              </div>
            </div>
            <div className="w-full h-20 flex gap-2">
              {data.getProfilePreview.firstThreePosts.map((post) => {
                return (
                  <div className="w-1/3 h-full relative" key={post.cursor}>
                    <Image src={imageUrlOptimizer(post.node.postImage[0])} fill alt="post image" />
                  </div>
                );
              })}
            </div>
            <FriendshipStatus status={data.getProfilePreview.user.friendshipStatus} targetId={data.getProfilePreview.user._id} profilePreviewRefetch={refetch} />
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
