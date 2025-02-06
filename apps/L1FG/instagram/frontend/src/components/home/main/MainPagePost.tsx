'use client';
import { useGetSmallPostsQuery } from '@/generated';
import { useEffect } from 'react';
import HomeSinglePost from '@/components/home-post/Post';

const MainPagePost: React.FC = () => {
  const { data, loading, error, fetchMore } = useGetSmallPostsQuery({
    variables: {
      input: {
        after: '',
        first: 4,
      },
    },
  });
  useEffect(() => {
    const handleScroll = () => {
      if (!data?.getSmallPosts?.pageInfo?.hasNextPage) {
        return;
      }
      if (window.innerHeight + document.documentElement.scrollTop > (document.documentElement.scrollHeight / 15) * 12) {
        fetchMore({
          variables: {
            input: {
              after: data?.getSmallPosts?.pageInfo?.endCursor,
              first: 6,
            },
          },
          updateQuery(prevResult, { fetchMoreResult }) {
            if (!fetchMoreResult) {
              return prevResult;
            }
            if (prevResult.getSmallPosts?.pageInfo?.endCursor == fetchMoreResult.getSmallPosts?.pageInfo?.endCursor) {
              return prevResult;
            }
            const prevEdges = prevResult.getSmallPosts?.edges;
            const fetchResultEdges = fetchMoreResult.getSmallPosts?.edges;
            return {
              getSmallPosts: {
                ...fetchMoreResult.getSmallPosts,
                edges: [...prevEdges, ...fetchResultEdges],
                pageInfo: fetchMoreResult.getSmallPosts?.pageInfo,
              },
            };
          },
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data?.getSmallPosts?.pageInfo?.endCursor, data?.getSmallPosts?.pageInfo?.hasNextPage, fetchMore]);

  if (loading) return <p data-testid="post-loading">Loading posts...</p>;
  if (error) return <p data-testid="post-error">Error loading posts: {error.message}</p>;
  if (!data?.getSmallPosts?.edges || !data.getSmallPosts?.edges.length) {
    return <p data-testid="no-posts-message">No posts available</p>;
  }
  return (
    <div className="space-y-8" data-testid="posts-container">
      {data?.getSmallPosts?.edges.map((post) => {
        return <HomeSinglePost key={post.cursor} post={post} />;
      })}
    </div>
  );
};

export default MainPagePost;
