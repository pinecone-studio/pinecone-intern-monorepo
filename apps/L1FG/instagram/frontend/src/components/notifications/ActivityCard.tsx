import { Heart } from 'lucide-react';

const ActivityCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-96 h-36 p-4">
      <div className="w-13 h-13 p-3 rounded-full border border-black flex items-center justify-center">
        <Heart className="w-6 h-6" />
      </div>
      <h2 className="text-lg leading-6 font-semibold text-b mt-2">Activity On Your Posts</h2>
      <p className="text-sm leading-5 font-normal text-gray-600 text-center">When someone likes or comments on one of your posts, you'll see it here.</p>
    </div>
  );
};

export default ActivityCard;
