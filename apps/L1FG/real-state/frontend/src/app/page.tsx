'use client';

import HomePage from '@/components/HomePage/HomePage';
import { useQueryQuery } from '@/generated';

const Page = () => {
  const { data } = useQueryQuery();
  return (
    <div>
      <HomePage />;<p>Data:{data?.sampleQuery}</p>
    </div>
  );
};

export default Page;
