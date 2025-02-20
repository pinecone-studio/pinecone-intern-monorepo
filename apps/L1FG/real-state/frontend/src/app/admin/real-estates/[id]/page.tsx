'use client';
import AdminSinglePage from '@/components/adminSinglePage/AdminSinglePage';
import { useGetPostByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { GetPostByIdQuery } from '@/generated';

const Page = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data, error, loading } = useGetPostByIdQuery({
    variables: { id: id },
  });

  if (!id) {
    return <div>Invalid Post ID</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <AdminSinglePage property={data?.getPostById as GetPostByIdQuery['getPostById']} />;
};

export default Page;
