import Image from 'next/image';
import { imageUrlOptimizer } from '../utils/image-url-optimizer';

export const Avatar = ({ hasStoryToSee, image }: { hasStoryToSee: boolean; image: string }) => {
  return (
    <div
      className={`rounded-full mb-3 w-fit  p-[3px] mt-2 image hover:cursor-pointer ${hasStoryToSee ? 'bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)]' : ''}`}
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
