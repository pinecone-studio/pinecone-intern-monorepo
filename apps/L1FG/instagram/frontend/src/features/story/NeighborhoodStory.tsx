import { OneUserStoriesType } from '@/generated';
import Image from 'next/image';

export const NeighborhoodStory = ({ node }: { node: OneUserStoriesType }) => {
  return (
    <div key={node._id} className="w-[245px] h-[433px] relative rounded-xl overflow-hidden">
      <Image src={node.items[node.items.length - 1].storyImage} fill alt="image" />
      <div className={`w-full h-full`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20" />
            <p className="text-white">{node.user.userName}</p>
            <p className="text-gray-400">created at</p>
          </div>
        </div>
      </div>
    </div>
  );
};
