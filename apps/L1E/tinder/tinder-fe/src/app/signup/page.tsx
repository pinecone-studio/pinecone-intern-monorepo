/* eslint-disable no-unused-vars */
'use client';
import { useEffect, useState } from 'react';
import Signup from '@/components/signup/Signup';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/main/Loading';

const SignupPage = () => {
  const [_hasToken, setHasToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setHasToken(true);
      router.push('/main');
    } else {
      setHasToken(false);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen w-screen">
      <Signup />
    </div>
  );
};

export default SignupPage;
