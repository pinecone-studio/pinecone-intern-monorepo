'use client';

import NewsFeed from '@/components/NewsFeed';
import Story from '@/components/Story';

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="2xl:pl-[650px] xl:pl-[350px]">
        <Story />
      </div>
      <NewsFeed />
    </div>
  );
};

export default Page;
