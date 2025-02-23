'use client';

import AdminPage from '@/components/adminPage/AdminPage';
import { GetAllAdminPostsQuery, useGetAllAdminPostsQuery } from '@/generated';

const Page = () => {
  const { data, error, loading } = useGetAllAdminPostsQuery();
  if (loading) return <div>...loading</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <AdminPage posts={data?.getPosts as GetAllAdminPostsQuery['getPosts']} />
    </div>
  );
};

export default Page;
