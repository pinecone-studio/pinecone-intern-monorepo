'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/sign-in');
  });
  return <></>;
};
export default Home;
