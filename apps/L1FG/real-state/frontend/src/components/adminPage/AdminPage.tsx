'use client';

import { GetAllAdminPostsQuery } from '@/generated';
import AdminHeader from './AdminHeader';
import { AdminOwnerPostDa } from './AdminOwnerPostDa';

interface AdminGetPostsProps {
  posts: GetAllAdminPostsQuery['getPosts'];
}

const AdminPage = ({ posts }: AdminGetPostsProps) => {
  return (
    <div>
      <AdminHeader />
      <AdminOwnerPostDa posts={posts} />
    </div>
  );
};

export default AdminPage;
