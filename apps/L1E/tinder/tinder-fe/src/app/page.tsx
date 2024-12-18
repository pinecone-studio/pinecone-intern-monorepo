'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import Link from 'next/link';

const Page = () => {
  return (
    <div>
      <div className="relative">
        <div className="h-[100%] absolute opacity-70 w-[100%] bg-black"></div>
        <Header />
        <Footer />
        <img className="h-[100%] w-[100%]" src="backround.png" alt="" />
        <div className="absolute top-[40%] right-[37%]">
          <div className="flex  flex-col items-center">
            <div className="text-[64px] font-bold text-white">Swipe Right®</div>
            <Link href="signup" className="text-white bg-[#E11D48] font-medium text-sm p-4 rounded-full">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
