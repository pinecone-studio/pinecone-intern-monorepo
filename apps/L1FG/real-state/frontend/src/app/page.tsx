'use client';

import AddEstate from '@/components/addEstate/AddEstate';
import HomePage from '@/components/HomePage/AddPropertyPage';
import { useQueryQuery } from '@/generated';

const Page = () => {
  const { data } = useQueryQuery();

  return (
    <div>
      <HomePage />
      <p>Data:{data?.sampleQuery}</p>
    </div>
  );
};

export default Page;
