'use client';

import NewsFeed from '@/components/NewsFeed';
import Story from '@/components/Story';

const Page = () => {
  return (
    <div className="flex flex-col items-center  ">
      <div className="pl-24">
        <Story />
      </div>
      <NewsFeed />
    </div>
  );
};

export default Page;
