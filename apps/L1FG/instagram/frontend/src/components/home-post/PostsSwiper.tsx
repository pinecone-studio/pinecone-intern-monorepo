import { PostsEdge } from '@/generated';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { imageUrlOptimizer } from '../utils/image-url-optimizer';
export const PostsSwiper = ({ post }: { post: PostsEdge }) => {
  if (post.node.carouselMediaCount <= 0) {
    return null;
  }
  const isMultipleImages = post.node?.carouselMediaCount > 1;
  return (
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
            <Image src={imageUrlOptimizer(image)} alt={`Post Image ${index + 1}`} fill className="object-cover" data-testid="post-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
