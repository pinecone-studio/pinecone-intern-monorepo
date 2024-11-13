import { GoDotFill } from 'react-icons/go';
import { LuSearch } from "react-icons/lu";
 
export const MainNavbar = () => {
  return (
    <div className="border py-6 px-12 flex justify-between">
      <div className="flex items-center">
        <GoDotFill className="w-8 h-8 text-white" />
        <h1 className="text-white font-semibold text-2xl">TICKET BOOKING</h1>
      </div>
      <div className=' text-white flex relative items-center text-sm'>
        <input className='bg-black py-2 px-5 w-80 outline outline-[#27272A] rounded-md' placeholder='Хайлт'/>
        <LuSearch className='absolute right-5'/>
      </div>
      <div className='text-white text-sm font-medium flex gap-4'>
        <button className='border border-[#27272A] py-2 px-6 rounded-md hover:bg-[#00B7F4] hover:text-black text-[#FAFAFA]'>Бүртгүүлэх</button>
        <button className='border border-[#27272A] py-2 px-10 rounded-md hover:bg-[#00B7F4] hover:text-black text-[#FAFAFA]'>Нэвтрэх</button>
      </div>
    </div>
  );
};
 
 