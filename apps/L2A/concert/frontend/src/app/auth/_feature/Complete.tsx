'use client';
import LoadingText from '@/app/_components/LoadingText';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MdOutlineDone } from 'react-icons/md';

export const Complete = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/auth/signin');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="bg-black flex justify-center h-[100vh] w-[100%]">
      <div className="w-[446px] h-[276px] border-[1px]  border-[#27272A] rounded-2xl flex justify-center items-center mt-[190px]">
        <div className=" flex flex-col items-center">
          <div className="w-[100px] h-[100px] rounded-full bg-[#131313] ml-[32px] mb-4 flex justify-center items-center ">
            <MdOutlineDone className="w-[65px] h-[56px] text-[#00B7F4] " />
          </div>
          <div className="text-white flex flex-col justify-center items-center gap-2">
            <div>Нууц үг амжилттай солигдлоо.</div> <LoadingText />
          </div>
        </div>
      </div>
    </div>
  );
};
