'use client';
import React from 'react';
import { Bookmark, MessageCircle } from 'lucide-react';
import { PostsEdge } from '@/generated';
import { Avatar } from './Avatar';
import { Username } from './Username';
import { PostsSwiper } from './PostsSwiper';
import { PostCaption } from './PostCaption';
import { PostComment } from './PostComment';
import { PostLike } from '../home/main/PostLike';
import { ProfileHover } from './ProfileHover';
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
      <div className="flex items-center justify-between px-1 py-3 text-xl" data-testid="post-actions">
        <div className="flex gap-3">
          {post.node.userId && post.node._id && <PostLike ownerUserId={post.node.userId} postId={post.node._id} />}
          <MessageCircle data-testid="comment-icon" className="cursor-pointer" />
        </div>
        <Bookmark data-testid="bookmark-icon" className="cursor-pointer" />
      </div>
      <div>
        <p data-testid="like-count">{post.node?.likeCount} likes</p>
      </div>

      <PostCaption post={post} />
      <PostComment post={post} />
    </div>
  );
};
export default HomeSinglePost;
