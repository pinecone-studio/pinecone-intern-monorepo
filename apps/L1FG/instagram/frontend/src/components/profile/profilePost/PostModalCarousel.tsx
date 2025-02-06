import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { UserPostType } from '@/generated';

const PostModalCarousel = ({ post }: { post: UserPostType }) => {
  return (
    <div className="relative">
      <Carousel>
        <CarouselContent>
          {post.postImage?.map((image: string, index: number) => (
            <CarouselItem key={index}>
              <Image src={image} alt={`Post Image ${index + 1}`} width={1200} height={900} className="w-full h-[700px] object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default PostModalCarousel;
