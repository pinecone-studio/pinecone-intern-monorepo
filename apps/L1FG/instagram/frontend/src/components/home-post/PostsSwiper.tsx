import { PostsEdge } from '@/generated';
import Image from 'next/image';
import { imageUrlOptimizer } from '../utils/image-url-optimizer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export const PostsSwiper = ({ post }: { post: PostsEdge }) => {
  if (post.node.carouselMediaCount <= 0) {
    return null;
  }
  const isMultipleImages = post.node?.carouselMediaCount > 1;
  return (
    <Carousel data-testid="post-carousel">
      <CarouselContent className="w-full h-[585px] ml-0  ">
        {post.node?.postImage.map((image, index) => (
          <CarouselItem key={index} className="basis-full relative">
            <Image src={imageUrlOptimizer(image)} alt={`Post Image ${index + 1}`} fill className="object-cover" data-testid="post-image" />
          </CarouselItem>
        ))}
      </CarouselContent>
      {isMultipleImages && (
        <>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
        </>
      )}
    </Carousel>
  );
};
