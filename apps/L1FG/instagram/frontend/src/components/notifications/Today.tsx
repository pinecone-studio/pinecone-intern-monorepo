import { LikedPost } from './LikedPost';
import { RequestFollow } from './RequestFollow';

export const Today = () => {
  return (
    <div className="p-4 border-b">
      <h2 className="font-bold">Today</h2>
      <RequestFollow />
      <LikedPost />
    </div>
  );
};
