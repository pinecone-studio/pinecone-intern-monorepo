'use client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { PostsEdge, useGetProfilePreviewLazyQuery } from '@/generated';
import { Avatar } from './Avatar';
import Image from 'next/image';
import { imageUrlOptimizer } from '../utils/image-url-optimizer';
import { FriendshipStatus } from '../../features/home-post/FriendshipStatus';
import { ProfilePreviewSkeleton } from '../skeleton/ProfilePreviewSkeleton';
export const ProfileHover = ({ children, searchingUserId }: { children: React.ReactNode; searchingUserId: string }) => {
  const [getProfilePreview, { data, loading }] = useGetProfilePreviewLazyQuery();
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
      <HoverCardContent className="w-[350px] h-[340px] p-0  ml-[300px] rounded-lg ">
        {loading && <ProfilePreviewSkeleton />}
        {data && (
          <div className="flex flex-col  ">
            <div className="flex gap-4 h-fit w-fit justify-center items-center p-3">
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
            <div className="w-full h-[120px] flex gap-1 pt-4">
              {data.getProfilePreview.firstThreePosts.map((post) => {
                return (
                  <div className="w-1/3 h-full relative" key={post.cursor}>
                    <Image src={imageUrlOptimizer(post.node.postImage[0])} fill alt="post image" />
                  </div>
                );
              })}
            </div>
            <div className="p-3">
              <FriendshipStatus preview={data} />
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
