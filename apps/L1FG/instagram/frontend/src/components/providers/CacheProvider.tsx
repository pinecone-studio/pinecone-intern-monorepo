'use client';

import { gql, useApolloClient } from '@apollo/client';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useAuth } from './AuthProvider';
type cacheLikePostParams = {
  postId: string;
  likeCount: number;
  hasLiked: boolean;
};
type cacheFollowParams = {
  targetId: string;
  followerCount: number;
};
type CacheContextType = {
  cacheLikePost: (_params: cacheLikePostParams) => void;
  cacheUnlikePost: (_params: cacheLikePostParams) => void;
  cacheFollow: (_params: cacheFollowParams) => void;
  cacheUnfollow: (_params: cacheFollowParams) => void;
};
const CachContext = createContext<CacheContextType>({} as CacheContextType);
export const CacheProvider = ({ children }: PropsWithChildren) => {
  const client = useApolloClient();
  const { user } = useAuth();
  const cacheLikePost = ({ postId, likeCount, hasLiked }: cacheLikePostParams) => {
    client.writeFragment({
      id: `UserPostType:${postId}`,
      fragment: gql`
        fragment test on UserPostType {
          likeCount
          hasLiked
        }
      `,
      data: {
        likeCount: likeCount,
        hasLiked: hasLiked,
      },
    });
  };
  const cacheUnlikePost = ({ postId, likeCount, hasLiked }: cacheLikePostParams) => {
    client.writeFragment({
      id: `UserPostType:${postId}`,
      fragment: gql`
        fragment test on UserPostType {
          likeCount
          hasLiked
        }
      `,
      data: {
        likeCount: likeCount,
        hasLiked: hasLiked,
      },
    });
  };

  const cacheFollow = ({ targetId, followerCount }: cacheFollowParams) => {
    client.writeFragment({
      id: `UserTogetherUserType:${targetId}`,
      fragment: gql`
        fragment test on UserTogetherUserType {
          followerCount
          friendshipStatus {
            following
          }
        }
      `,
      data: {
        followerCount: followerCount,
        friendshipStatus: {
          following: true,
        },
      },
    });
    client.writeFragment({
      id: `UserWithoutPassword:${user?._id}`,
      fragment: gql`
        fragment test on UserPostType {
          followingCount
        }
      `,
      data: {
        followingCount: (user?.followingCount as number) + 1,
      },
    });
  };
  const cacheUnfollow = ({ targetId, followerCount }: cacheFollowParams) => {
    client.writeFragment({
      id: `UserTogetherUserType:${targetId}`,
      fragment: gql`
        fragment test on UserTogetherUserTypeB {
          followerCount
          friendshipStatus {
            following
          }
        }
      `,
      data: {
        followerCount: followerCount,
        friendshipStatus: {
          following: false,
        },
      },
    });
    client.writeFragment({
      id: `UserWithoutPassword:${user?._id}`,
      fragment: gql`
        fragment test on UserPostType {
          followingCount
        }
      `,
      data: {
        followingCount: (user?.followingCount as number) - 1,
      },
    });
  };
  return <CachContext.Provider value={{ cacheLikePost, cacheUnlikePost, cacheFollow, cacheUnfollow }}>{children}</CachContext.Provider>;
};
export const useCache = () => {
  const context = useContext(CachContext);
  return context;
};
