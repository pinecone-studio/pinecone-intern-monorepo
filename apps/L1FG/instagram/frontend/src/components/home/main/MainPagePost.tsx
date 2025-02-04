'use client';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useGetSmallPostsQuery } from '@/generated';
import { Bookmark, HeartIcon, MessageCircle } from 'lucide-react';

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
    /*eslint-disable*/
    <div className="space-y-8" data-testid="posts-container">
      {data?.getSmallPosts?.edges.map((post) => {
        const isMultipleImages = (post.node?.carouselMediaCount || 0) > 1;
        return (
          <div key={post.node?._id} className="md:border-b-[1px] md:pb-5" data-testid="post-item">
            <div className="flex gap-2">
              <div className="rounded-full mb-3 w-fit bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)] p-[3px] mt-2">
                <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full overflow-hidden relative">
                    <Image src={post.node?.user?.profileImage} alt="zurag orno" fill className="object-cover" />
                  </div>
                </div>
              </div>

              <div className="pr-1 font-semibold text-sm text-black flex items-center ">{post.node?.user?.userName}</div>
            </div>
            <div className="w-full max-w-[645px] h-[585px] rounded overflow-hidden relative" data-testid="post-carousel">
              <Swiper
                data-testid="swiperId"
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={isMultipleImages}
                spaceBetween={50}
                slidesPerView={1}
                className="w-full h-full"
              >
                {post.node?.postImage.map((image, index) => (
                  <SwiperSlide key={index} data-testid="swiper-slide">
                    <Image src={image} alt={`Post Image ${index + 1}`} fill className="object-cover" data-testid="post-image" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex items-center justify-between px-1 py-3 text-xl" data-testid="post-actions">
              <div className="flex gap-3">
                <HeartIcon data-testid="like-icon" className="cursor-pointer" />
                <MessageCircle data-testid="comment-icon" className="cursor-pointer" />
              </div>
              <Bookmark data-testid="bookmark-icon" className="cursor-pointer" />
            </div>

            {/* Like count */}
            <div>
              <p data-testid="like-count">{post.node?.likeCount} likes</p>
            </div>

            {/* Post Description */}
            <div data-testid="post-description">
              <h1 className="text-base font-normal">
                <span className="pr-1 font-bold text-black" data-testid="post-username">
                  {post.node?.user?.userName}
                </span>
                {post.node?.caption}
              </h1>
            </div>

            {/* Comments Section */}
            <div className="text-gray-500" data-testid="comments-section">
              {post.node?.commentCount && post.node?.commentCount > 0 ? (
                <p data-testid="view-comments">View {post.node?.commentCount} comment(s)</p>
              ) : (
                <p data-testid="no-comments">No comments yet.</p>
              )}
              <p className="cursor-pointer" data-testid="add-comment">
                Add a comment
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainPagePost;
