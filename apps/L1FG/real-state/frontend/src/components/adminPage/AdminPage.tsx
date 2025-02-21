'use client';

import { GetAllAdminPostsQuery } from '@/generated';
import { AdminOwnerPostDa } from './AdminOwnerPostDa';

interface AdminGetPostsProps {
  posts: GetAllAdminPostsQuery['getPosts'];
}

const AdminPage = ({ posts }: AdminGetPostsProps) => {
  return <AdminOwnerPostDa posts={posts} />;
};

export default AdminPage;
