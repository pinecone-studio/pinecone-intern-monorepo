import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
const Navigation = () => {
  return (
    <div className="flex flex-col gap-10  w-full h-full">
      <Navbar />
      <div className="w-full flex justify-center items-center">
        <p className="text-[20px] text-[#441500]">Захиалгын дэлгэрэнгүй</p>
      </div>
      <div className="flex flex-col gap-2 ">
        <p className="text-gray-400 pl-4 text-[12px]">Захиалгын дугаар:</p>
        <p className="pl-4 font-thin">#31321</p>
        <div className="flex justify-center">
          <div className="w-[350px] h-[1px] bg-gray-400"></div>
        </div>

        <p className="text-gray-400 pl-4 text-[12px]">Захиалгын төлөв:</p>
        <p className="pl-4 font-thin">Бэлтгэгдэж буй</p>
        <div className="flex justify-center">
          <div className="w-[350px] h-[1px] bg-gray-400"></div>
        </div>
        <p className="text-gray-400 pl-4 text-[12px]">Захиалгын огноо:</p>
        <p className="pl-4 font-thin">2024.10.19 12:37</p>
        <div className="flex justify-center">
          <div className="w-[350px] h-[1px] bg-gray-400"></div>
        </div>
        <p className="text-[12px] text-gray-400 pl-4">Захиалга:</p>
        <div className="flex pl-4">
          <Image alt="" src={'/hool.png'} width={100} height={100}></Image>
          <div className="pl-5">
            <p className="font-thin">Taco</p>
            <p className="font-extrabold">15.6k</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 border-[1px] rounded-md border-gray-300 flex items-center justify-center text-[25px]">-</div>
              <p className="pt-2">1</p>
              <div className="w-10 h-10 border-[1px] rounded-md border-gray-300 flex items-center justify-center text-[25px]">+</div>
            </div>
          </div>
        </div>
        <div className="flex pl-4">
          <Image alt="" src={'/hool.png'} width={100} height={100}></Image>
          <div className="pl-5">
            <p className="font-thin">Taco</p>
            <p className="font-extrabold">15.6k</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 border-[1px] rounded-md border-gray-300 flex items-center justify-center text-[25px]">-</div>
              <p className="pt-2">1</p>
              <div className="w-10 h-10 border-[1px] rounded-md border-gray-300 flex items-center justify-center text-[25px]">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
