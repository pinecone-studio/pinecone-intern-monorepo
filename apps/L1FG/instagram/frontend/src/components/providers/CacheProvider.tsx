'use client';

import { gql, useApolloClient } from '@apollo/client';
import { createContext, PropsWithChildren, useContext } from 'react';
type cacheLikePostParams = {
  postId: string;
  likeCount: number;
  hasLiked: boolean;
};
type CacheContextType = {
  cacheLikePost: (_params: cacheLikePostParams) => void;
  cacheUnlikePost: (_params: cacheLikePostParams) => void;
};
const CachContext = createContext<CacheContextType>({} as CacheContextType);
export const CacheProvider = ({ children }: PropsWithChildren) => {
  const client = useApolloClient();
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
  return <CachContext.Provider value={{ cacheLikePost, cacheUnlikePost }}>{children}</CachContext.Provider>;
};
export const useCache = () => {
  const context = useContext(CachContext);
  return context;
};
