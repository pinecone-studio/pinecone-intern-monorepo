'use client';

import { Estates } from '@/components/estatesPage/EstatePage';
import { EstateSideBar } from '@/features/card/EstatesSideBar';
import { useGetPostsQuery } from '@/generated';

const Page = () => {
  const { data, loading, error } = useGetPostsQuery();
  if (loading) return <div>loading</div>;
  if (error) console.log(error);
  return (
    <div className="flex justify-between p-4 gap-4 max-w-screen-xl">
      <EstateSideBar />
      <Estates data={data?.getPosts} />
    </div>
  );
};

export default Page;
