'use client';
import React from 'react';
import { PostsEdge } from '@/generated';
import { AvatarLink } from './AvatarLink';
import { Username } from './Username';
import { PostsSwiper } from './PostsSwiper';
import { PostCaption } from './PostCaption';
import { PostComment } from './PostComment';
import { ProfileHover } from '../../features/home-post/ProfileHover';
import { PostLikeSection } from '../../features/home-post/PostLikeSection';
import { PostDate } from './PostDate';
import { ProfileOrStory } from './ProfileOrStory';
import { FriendshipStatus } from '@/features/home-post/FriendshipStatus';

const HomeSinglePost = ({ post }: { post: PostsEdge }) => {
  const hasStory = post?.node?.user?.latestStoryTimestamp > post?.node?.user?.seenStoryTime;
  const urlWhenHasStory = `/stories/${post.node.user.userName}/${post.node.user._id} `;
  const urlWhenNoStory = `/${post.node.user._id}`;
  return (
    <div className="md:border-b-[1px] md:pb-5 " data-testid="post-item">
      <div className="flex gap-2">
        <ProfileHover searchingUserId={post.node.user._id}>
          <AvatarLink post={post} />
        </ProfileHover>
        <ProfileHover searchingUserId={post.node.user._id}>
          <div className="flex flex-col justify-center h-full">
            <ProfileOrStory hasStory={hasStory} urlWhenHasStory={urlWhenHasStory} urlWhenNoStory={urlWhenNoStory}>
              <Username post={post} />
            </ProfileOrStory>
          </div>
        </ProfileHover>
        <PostDate date={post.node.createdAt} />
        <FriendshipStatus
          followerId=""
          preview={post.node.user}
          followStyle="text-[#0095F6] hover:text-black font-semibold text-sm"
          requestedStyle="text-[#EFEFEF] hover:text-[#C7C7C7]  font-semibold text-sm"
        />
      </div>
      <PostsSwiper post={post} />
      <PostLikeSection post={post} />
      <PostCaption post={post} />
      <PostComment post={post} />
    </div>
  );
};
export default HomeSinglePost;
