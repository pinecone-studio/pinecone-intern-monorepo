import { PostsEdge } from '@/generated';
import Image from 'next/image';
import { imageUrlOptimizer } from '../utils/image-url-optimizer';

export const Avatar = ({ post }: { post: PostsEdge }) => {
  const hasStoryToSee = post.node.user.latestStoryTimestamp > post.node.user.seenStoryTime;
  return (
    <div className={`rounded-full mb-3 w-fit  p-[3px] mt-2 ${hasStoryToSee ? 'bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)]' : ''}`} data-testid="image hover:cursor-pointer">
      <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
        <div className="w-7 h-7 rounded-full overflow-hidden relative">
          <Image src={imageUrlOptimizer(post.node?.user?.profileImage)} alt="zurag orno" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};
