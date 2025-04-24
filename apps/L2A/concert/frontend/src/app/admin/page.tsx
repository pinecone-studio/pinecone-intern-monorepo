'use client';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const router = useRouter();
  router.push('/admin/ticket');
  return <div></div>;
};

export default AdminPage;
