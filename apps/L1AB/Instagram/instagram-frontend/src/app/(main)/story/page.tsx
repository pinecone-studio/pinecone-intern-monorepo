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
      <div className="bg-[#18181a] w-screen h-screen flex flex-col">
        <div className="p-6 flex justify-between ">
          <div>
            <Image src={'/LogoWhite.png'} width={103} height={29} alt="instagram-logo" />
          </div>
          <Link href={`/home`}>
            <X className="text-white" />
          </Link>
        </div>

        <div className="flex-1">
          <StoryDetail userId={userId!} setUserId={setUserId} />
        </div>
      </div>
    </NuqsAdapter>
  );
};

export default Story;
