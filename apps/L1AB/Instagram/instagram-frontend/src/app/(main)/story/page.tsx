'use client';

import StoryDetail from '@/components/StoryDetail';
import Image from 'next/image';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useStory } from '@/components/providers';
import { useQueryState } from 'nuqs';
import { NuqsAdapter } from 'nuqs/adapters/next/pages';

const Story = () => {
  const [userId, setUserId] = useQueryState('userId', { defaultValue: '' });

  const { groupedStories } = useStory();
  if (!groupedStories) return <p>Loading...</p>;

  return (
    <NuqsAdapter>
      <div className=" bg-[#18181a] w-screen h-screen ">
        <div className="p-6 flex justify-between ">
          <div>
            <Image src={'/LogoWhite.png'} width={103} height={29} alt="instagram-logo" />
          </div>
          <Link href={`/home`}>
            <X className="text-white" />
          </Link>
        </div>

        <div className="flex justify-center items-center">
          <div className="border w-fit ">
            <StoryDetail userId={userId!} setUserId={setUserId} />
          </div>

          {/* {Object.keys(groupedStories).map((userId) => {
          const group = groupedStories[userId];
          return (
            <div>
              {' '}
              {group.stories.map((item, index) => (
                <div>
                  {' '}
                  <div className="relative w-[245px] h-[344px]">
                    <Image fill src={item.image} alt="" />
                  </div>
                </div>
              ))}
            </div>
          );
        })} */}
        </div>
      </div>
    </NuqsAdapter>
  );
};

export default Story;
