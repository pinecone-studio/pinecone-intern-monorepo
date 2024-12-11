'use client';

import NewsFeed from '@/components/NewsFeed';
import Story from '@/components/Story';

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <Story />
      <NewsFeed />
    </div>
  );
};

export default Page;
