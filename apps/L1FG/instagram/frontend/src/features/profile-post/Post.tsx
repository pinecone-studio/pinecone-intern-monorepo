import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { GetPostsQuery, useGetPostsQuery } from '@/generated';
import PostModal from '../../components/profile/profilePost/PostModal';
import Message from '@/components/svg/Message';
import Heart from '@/components/svg/Heart';
import SkeletonGrid from '../../components/profile/profilePost/SkeletonGrid';
import { Loader } from 'lucide-react';
import { Footer } from '@/components/profile/Footer';

const Post = ({ userId }: { userId: string }) => {
  const [morePostsLoading, setMorePostsLoading] = useState(false);

  const { data, loading, fetchMore } = useGetPostsQuery({
    variables: {
      input: {
        searchingUserId: userId,
        after: '',
        first: 9,
      },
    },
  });

  const updateQueryHandler = useCallback((prevResult: GetPostsQuery, { fetchMoreResult }: { fetchMoreResult?: GetPostsQuery }): GetPostsQuery => {
    if (!fetchMoreResult) return prevResult;
    if (prevResult.getPosts?.pageInfo?.endCursor === fetchMoreResult.getPosts?.pageInfo?.endCursor) {
      return prevResult;
    }

    return {
      getPosts: {
        ...fetchMoreResult.getPosts,
        edges: [...(prevResult.getPosts?.edges ?? []), ...(fetchMoreResult.getPosts?.edges ?? [])],
        pageInfo: fetchMoreResult.getPosts?.pageInfo,
      },
    };
  }, []);

  const checkIfNearBottom = useCallback((target: HTMLDivElement) => {
    return target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
  }, []);

  const canFetchMore = useCallback(() => {
    return !morePostsLoading && data?.getPosts?.pageInfo?.hasNextPage && data?.getPosts?.pageInfo?.endCursor;
  }, [morePostsLoading, data]);

  const fetchMorePosts = useCallback(async () => {
    if (!data?.getPosts?.pageInfo?.endCursor) return;

    try {
      setMorePostsLoading(true);
      await fetchMore({
        variables: {
          input: {
            searchingUserId: userId,
            after: data.getPosts.pageInfo.endCursor,
            first: 6,
          },
        },
        updateQuery: updateQueryHandler,
      });
    } catch (error) {
      console.error('Error fetching more posts:', error);
    } finally {
      setMorePostsLoading(false);
    }
  }, [data, fetchMore, userId, updateQueryHandler]);

  const handleMorePosts = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      if (checkIfNearBottom(target) && canFetchMore()) {
        await fetchMorePosts();
      }
    },
    [checkIfNearBottom, canFetchMore, fetchMorePosts]
  );

  return (
    <div className="flex flex-col gap-5 w-full mt-5" data-testid="profile-posts">
      <div>
        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-3 gap-1 overflow-y-scroll max-h-[800px]" onScroll={handleMorePosts}>
            {data?.getPosts.edges.map((edge) => {
              if (!edge?.node?.postImage?.[0]) return null;

              return (
                <PostModal post={edge.node} key={edge.node._id}>
                  <div className="relative flex flex-col items-center justify-center group cursor-pointer w-full">
                    <Image
                      src={edge.node.postImage[0]}
                      alt="Post image"
                      className="object-cover w-[300px] aspect-square group-hover:opacity-90 transition-opacity duration-300  h-[400px]"
                      width={300}
                      height={400}
                    />
                    <div className="absolute flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full bg-black/50">
                      <div className="flex gap-2 justify-center items-center">
                        <Heart />
                        <p className="text-white font-bold text-lg">{edge.node.likeCount}</p>
                      </div>
                      <div className="flex gap-2 justify-center items-center">
                        <Message />
                        <p className="text-white font-bold text-lg">{edge.node.commentCount}</p>
                      </div>
                    </div>
                  </div>
                </PostModal>
              );
            })}

            {morePostsLoading && (
              <div className="col-span-3 flex justify-center py-4 mt-4">
                <Loader className="text-gray-500 animate-spin" size={36} />
              </div>
            )}
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Post;
