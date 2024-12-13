'use client';

import NewsFeed from '@/components/NewsFeed';
import Story from '@/components/Story';

const Page = () => {
  return (
    <div className="flex flex-col items-center pl-52">
      <Story />
      <NewsFeed />
    </div>
  );
};

export default Page;
