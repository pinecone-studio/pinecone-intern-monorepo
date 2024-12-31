'use client';
import { useEffect, useState } from 'react';
import Footer from '@/components/main/Footer';
import Header from '@/components/main/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/main/Loading';

const Page = () => {
  const [hasToken, setHasToken] = useState(false);
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
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0 bg-black opacity-100"></div>
      <img className="absolute inset-0 h-full w-full object-cover opacity-40" src="backround.png" alt="background" />
      <Header />
      <Footer />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[64px] font-bold text-white">Swipe Right®</div>
        {!hasToken && (
          <Link href="signup" className="mt-4 text-white bg-[#E11D48] font-medium text-sm p-4 rounded-full">
            Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default Page;
