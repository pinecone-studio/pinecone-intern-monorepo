'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <img className="absolute inset-0 h-full w-full object-cover" src="backround.png" alt="" />
      <Header />
      <Footer />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[64px] font-bold text-white">Swipe Right®</div>
        <Link href="signup" className="mt-4 text-white bg-[#E11D48] font-medium text-sm p-4 rounded-full">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Page;
