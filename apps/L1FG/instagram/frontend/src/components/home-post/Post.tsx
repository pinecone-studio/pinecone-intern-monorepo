'use client';
import React from 'react';
import { PostsEdge } from '@/generated';
import { Avatar } from './Avatar';
import { Username } from './Username';
import { PostsSwiper } from './PostsSwiper';
import { PostCaption } from './PostCaption';
import { PostComment } from './PostComment';
import { ProfileHover } from './ProfileHover';
import { PostLikeSection } from '../../features/home-post/PostLikeSection';
const HomeSinglePost = ({ post }: { post: PostsEdge }) => {
  return (
    <div className="md:border-b-[1px] md:pb-5" data-testid="post-item">
      <div className="flex gap-2">
        <ProfileHover searchingUserId={post.node.user._id}>
          <Avatar post={post} />
        </ProfileHover>
        <ProfileHover searchingUserId={post.node.user._id}>
          <div className="flex flex-col justify-center h-full">
            <Username post={post} />
          </div>
        </ProfileHover>
      </div>
      <PostsSwiper post={post} />
      <PostLikeSection post={post} />
      <PostCaption post={post} />
      <PostComment post={post} />
    </div>
  );
};
export default HomeSinglePost;
