'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainHeader } from '@/components/main/MainHeader';
import { CarouselUser } from '@/components/match/Carousel';
import { Loading } from '@/components/main/Loading';

const Page: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (!token) {
      router.push('/');
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <div>Error: No user found</div>;
  }

  return (
    <div>
      <MainHeader user={user} />
      <CarouselUser />
    </div>
  );
};

export default Page;
