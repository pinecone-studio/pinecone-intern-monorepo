'use client';

import { useAuth } from '@/components/providers/AuthProvider';
const Page = () => {
  const { user } = useAuth();
  console.log('USER:', user);
  return <div></div>;
};

export default Page;
