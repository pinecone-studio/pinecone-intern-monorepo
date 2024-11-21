'use client';

import StoryDetail from '@/components/StoryDetail';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import Link from 'next/link';

const Story = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  return (
    <div className="w-screen h-screen bg-[#18181a]">
      <div className="p-6 flex justify-between ">
        <div>
          <Image src={'/LogoWhite.png'} width={103} height={29} alt="instagram-logo" />
        </div>
        <Link href={`/home`}>
          <X className="text-white" />
        </Link>
      </div>

      <StoryDetail userId={userId!} />
    </div>
  );
};

export default Story;
