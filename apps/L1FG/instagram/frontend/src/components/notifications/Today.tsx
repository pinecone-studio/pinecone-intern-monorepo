import { LikedPost } from './LikedPost';
import { RequestFollow } from './RequestFollow';

export const Today = () => {
  return (
    <div className="border-b">
      <h2 className="font-bold px-6 mt-[22px] mb-[18px]">Today</h2>
      <RequestFollow />
      <LikedPost />
    </div>
  );
};
