'use client';
import Image from 'next/image';
import { useStory } from './providers/StoryProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type PropsType = {
  userId: string;
};
const StoryDetail = ({ userId }: PropsType) => {
  const { groupedStories } = useStory();
  if (!groupedStories) return <p>Loading...</p>;

  return (
    <div className=" bg-[#18181a] h-[100%] flex items-center justify-center ">
      <div className="flex flex-wrap gap-4">
        {Object.keys(groupedStories).map((userId) => {
          const group = groupedStories[userId];

          return (
            <div key={userId} className="flex flex-col items-start gap-2">
              {group.stories.map((story) => (
                <div key={story._id}>
                  <Image src={story.image} alt="" width={500} height={700} />

                  <p className="text-white">{story.userId.username}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-[90%] h-[100%] flex justify-center items-center "
      >
        <CarouselContent className="w-full h-full border-green-700">
          {Array.from({ length: 7 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5 h-full p-5">
              <div className="p-1">
                <Card className="h-[433px] w-[245px]">
                  <CardContent className="flex aspect-square items-center justify-center p-6"></CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-green-400" />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default StoryDetail;
