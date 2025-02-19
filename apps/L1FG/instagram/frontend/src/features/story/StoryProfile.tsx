import { PostDate } from '@/components/home-post/PostDate';
import { imageUrlOptimizer } from '@/components/utils/image-url-optimizer';
import { OneStoryType } from '@/generated';
import Image from 'next/image';

export const StoryProfile = ({ story }: { story: OneStoryType }) => {
  return (
    <div className="w-full h-8 flex justify-between mt-2">
      <div className="h-full w-fit flex gap-[8px] items-center">
        <div className="h-full w-8 rounded-full overflow-hidden">
          <Image src={imageUrlOptimizer(story.user.profileImage)} width={32} height={32} alt="image" className="object-cover" />
        </div>
        <p className="text-white text-[14px]">{story.user.userName}</p>
        <p>{PostDate({ date: story.createdAt })}</p>
      </div>
    </div>
  );
};
