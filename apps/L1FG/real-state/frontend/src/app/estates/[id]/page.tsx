'use client';

import EstateSinglePage from '@/components/estatesSinglePage/EstatesSinglePage';
import { Post, useGetPostByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const newid = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data, loading, error } = useGetPostByIdQuery({
    variables: { id: newid },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.getPostById && (
        <div>
          <EstateSinglePage data={data?.getPostById as Post} />
        </div>
      )}
    </div>
  );
};

export default Page;
