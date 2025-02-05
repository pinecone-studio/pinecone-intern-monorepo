'use client';
import React from 'react';
import { Bookmark, HeartIcon, MessageCircle } from 'lucide-react';
import { PostsEdge } from '@/generated';
import { Avatar } from './Avatar';
import { Username } from './Username';
import { PostsSwiper } from './PostsSwiper';
import { PostCaption } from './PostCaption';
import { PostComment } from './PostComment';
const HomeSinglePost = ({ post }: { post: PostsEdge }) => {
  return (
    <div className="md:border-b-[1px] md:pb-5" data-testid="post-item">
      <div className="flex gap-2">
        <Avatar post={post} />
        <Username post={post} />
      </div>
      <PostsSwiper post={post} />
      <div className="flex items-center justify-between px-1 py-3 text-xl" data-testid="post-actions">
        <div className="flex gap-3">
          <HeartIcon data-testid="like-icon" className="cursor-pointer" />
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
