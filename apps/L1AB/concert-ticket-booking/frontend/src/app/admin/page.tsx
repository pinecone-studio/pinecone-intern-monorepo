'use client';
import { AdminDash, useAuth } from '@/components';
import { Container } from '@/components';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { user, getMeLoading } = useAuth();
  const router = useRouter();

  if (getMeLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/');
    return null;
  }

  if (user.role !== 'admin') {
    router.push('/404');
    return null;
  }

  return (
    <Container>
      <AdminDash />
    </Container>
  );
};

export default Page;
