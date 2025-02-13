'use client ';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HomePageHero = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  return (
    <div className="relative h-[560px] w-screen flex flex-col items-center justify-center text-center">
      <Image src="/cover.png" alt="Background" layout="fill" objectFit="cover" priority />
      <div className="w-full absolute inset-0 h-full flex justify-center flex-col items-center gap-4 backdrop-brightness-50">
        <h1 className="text-6xl text-white font-bold flex-wrap ">Танд таалагдах газраа олцгооё.</h1>
        <div className=" flex  bg-white px-4 py-2 rounded-lg gap-6  ">
          <input className="" value={searchValue || ''} onChange={(e) => setSearchValue(e.target.value)} placeholder="Өөрийн хайж буй хотхон болон хаягаа оруулна уу" />
          <button className="bg-orange-500 px-4 py-2 rounded-lg text-white " onClick={() => router.push(`estates/?searchValue=${searchValue}`)}>
            Хайх
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageHero;
