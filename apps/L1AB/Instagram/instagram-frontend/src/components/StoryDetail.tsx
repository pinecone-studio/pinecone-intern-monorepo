'use client';

import { useStory } from './providers/StoryProvider';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import React, { useEffect, useMemo, useState } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import { Options } from 'nuqs';
import { UserStory } from './UserStory';

type PropsType = {
  userId: string;
  setUserId: (value: string | ((old: string) => string | null) | null, options?: Options) => Promise<URLSearchParams>;
};

const StoryDetail = ({ userId, setUserId }: PropsType) => {
  const { groupedStories } = useStory();
  if (!groupedStories) return <p>Loading...</p>;

  const mainUserStory = Object.keys(groupedStories).find((item) => item === userId);

  const [api, setApi] = React.useState<CarouselApi>();

  const currentIndex = useMemo(() => {
    if (!groupedStories) return 0;
    return Object.keys(groupedStories).indexOf(userId);
  }, [userId, groupedStories]);

  const prevUser = async () => {
    if (!groupedStories) return;
    const prevIndex = (Object.keys(groupedStories).length + currentIndex - 1) % Object.keys(groupedStories).length;
    const prevUserId = Object.keys(groupedStories)[prevIndex];
    await setUserId(prevUserId);
  };

  const nextUser = async () => {
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
    <div className="h-full flex items-center justify-center w-full ">
      <Carousel setApi={setApi} className="w-[521px] [&>div]:overflow-visible">
        <CarouselContent className="items-center">
          {Object.keys(groupedStories).map((userId, index) => {
            const group = groupedStories[userId];

            return (
              <CarouselItem key={userId + index}>
                {group.stories.slice(0, 1).map((item, index) => {
                  return (
                    <UserStory
                      key={index}
                      userId={userId!}
                      prevUser={prevUser}
                      nextUser={nextUser}
                      stories={group.stories}
                      username={item.userId.username}
                      profilePicture={item.userId.profilePicture}
                      mainUserStory={mainUserStory!}
                    />
                  );
                })}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default StoryDetail;
