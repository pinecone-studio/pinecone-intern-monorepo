import { imageUrlOptimizer } from '@/components/utils/image-url-optimizer';
import Image from 'next/image';

export const SuggestionProfile = ({ hasStoryToSee, image }: { hasStoryToSee: boolean; image: string }) => {
  return (
    <div className={`image hover:cursor-pointer ${hasStoryToSee ? 'bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)]' : ''}`} data-testid="">
      <div className="rounded-full bg-white m-1 flex items-center justify-center">
        <div className="w-11 h-11 rounded-full overflow-hidden relative border">
          <Image src={imageUrlOptimizer(image)} alt="zurag orno" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};
