import { imageUrlOptimizer } from '@/components/utils/image-url-optimizer';
import Image from 'next/image';

export const AvatarForStory = ({ hasStoryToSee, image }: { hasStoryToSee: boolean; image: string }) => {
  return (
    <div
      className={`rounded-full w-fit  image hover:cursor-pointer p-[2px] ${hasStoryToSee ? 'bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)]' : ''}`}
      data-testid="avatar-inside-avatar-link"
    >
      <div className="rounded-full bg-white w-14 h-14 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full overflow-hidden relative border">
          <Image src={imageUrlOptimizer(image)} alt="zurag orno" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};
