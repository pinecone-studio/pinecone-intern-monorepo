'use client';
import Image from 'next/image';
import { useStory } from './providers/StoryProvider';

type PropsType = {
  userId: string;
};
const StoryDetail = ({ userId }: PropsType) => {
  const data = useStory();
  const storyData = data.groupStories;

  return (
    <div className=" bg-[#18181a] w-full h-full">
      {storyData?.map((group, index) => {
        return (
          <div key={index} className="flex">
            {group.map((story, i) => (
              <div key={i} className="flex">
                {story.userId._id === userId ? (
                  <div className="relative w-[522px] h-[926px] ">
                    <Image src={story.image} fill alt="" objectFit="cover" />
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default StoryDetail;
