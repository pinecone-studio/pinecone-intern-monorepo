'use client';
import Image from 'next/image';
import { useStory } from './providers/StoryProvider';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Options } from 'nuqs';

type PropsType = {
  userId: string;
  setUserId: (value: string | ((old: string) => string | null) | null, options?: Options) => Promise<URLSearchParams>;
};

const StoryDetail = ({ userId, setUserId }: PropsType) => {
  const { groupedStories } = useStory();

  const [api, setApi] = React.useState<CarouselApi>();

  const currentIndex = useMemo(() => {
    if (!groupedStories) return 0;
    return Object.keys(groupedStories).indexOf(userId);
  }, [userId, groupedStories]);

  const prev = async () => {
    if (!groupedStories) return;
    const prevIndex = (Object.keys(groupedStories).length + currentIndex - 1) % Object.keys(groupedStories).length;
    const prevUserId = Object.keys(groupedStories)[prevIndex];
    await setUserId(prevUserId);
  };

  const next = async () => {
    if (!groupedStories) return;
    const prevIndex = (currentIndex + 1) % Object.keys(groupedStories).length;
    const prevUserId = Object.keys(groupedStories)[prevIndex];
    await setUserId(prevUserId);
  };

  useEffect(() => {
    if (!api) return;
    api.scrollTo(currentIndex, true);
  }, [currentIndex, api]);

  if (!groupedStories) return <p>Loading...</p>;

  return (
    <div className="bg-[#18181a] h-full flex items-center justify-center">
      {/* SHOW ALL STORIES */}
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-1">
          {Object.keys(groupedStories).map((userId, index) => {
            const group = groupedStories[userId];
            console.log(group);

            return (
              <CarouselItem key={userId + index} className="pl-1 md:basis-1/2 lg:basis-1/5">
                <div className="p-1">
                  <Card>
                    <CardContent className="w-fit h-fit">
                      {group.stories.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className="relative w-[245px] h-[344px]">
                              <Image fill src={item.image} alt="" />
                            </div>
                            <p className="text-green-600">{item.userId._id}</p>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}

          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={prev} data-testid="PrevButton">
              <ChevronLeft size={20} />
            </button>
            <button className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={next} data-testid="NextButton">
              <ChevronRight size={20} />
            </button>
          </div>
        </CarouselContent>
      </Carousel>

      {/* SHOW ONE USER'S STORY */}

      {/* <div className="h-[927px] w-full border relative rounded-md flex max-w-lg overflow-hidden">
        <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${(currentImageIndex * 100) / userStoriesGroup.stories.length}%)` }}>
          {userStoriesGroup.stories.map((item, index) => {
            return (
              <div className="relative">
                <div key={index} className="w-full rounded-lg overflow-hidden">
                  <div key={index} className="relative h-[926px] w-[522px] rounded-lg overflow-hidden">
                    <Image src={item.image} alt={`Story image ${index + 1}`} fill objectFit="cover" />;
                  </div>
                </div>
                <div className="absolute left-5 top-1 p-3  w-[93%]">
                  <div className="flex gap-2 w-full ">
                    {Array.from({ length: userStoriesGroup.stories.length }).map((_, i) => (
                      <div className="w-full ">
                        <div className={`${index === i ? 'bg-white' : 'bg-[#8C8C8C]'} flex gap-1 p-0.5 rounded-xl `}></div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden">
                      <Image fill alt="" src={item.userId.profilePicture} objectFit="cover" />
                    </div>
                    <h1 className="text-white">{item.userId.username}</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={prev} data-testid="PrevButton">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white" onClick={next} data-testid="NextButton">
            <ChevronRight size={20} />
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default StoryDetail;
