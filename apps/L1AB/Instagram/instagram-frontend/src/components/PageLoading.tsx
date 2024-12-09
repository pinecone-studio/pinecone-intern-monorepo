'use client';
import Image from 'next/image';

const PageLoading = () => {
  return (
    <div className="w-full min-h-screen bg-white left-0 top-0 absolute flex justify-between items-center z-50">
      <div className="w-full flex justify-end items-center flex-col h-screen p-10">
        <div className="relative w-[100px] h-[100px] mb-[calc(50%/2)]">
          <Image src={'https://r7.hiclipart.com/path/298/603/' + '791/logo-computer-icons-social' + '-media-insta-936ed28dab2d' + 'ec607fabd90c3d0b93d2.png?dl=1'} alt="logo" objectFit="cover" fill />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-[#A8A8A8] text-[14px]">From</p>
          <div className="relative h-[20px] w-[100px]">
            <Image src={'https://hananscorner.my.canva' + '.site/images/ce06defbb6a74' + 'd7821d8703a3d07c38f.png'} alt="logo" objectFit="cover" fill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
