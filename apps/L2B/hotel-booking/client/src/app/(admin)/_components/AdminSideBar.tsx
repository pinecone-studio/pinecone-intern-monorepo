'use client';
import { LogOut, Zap } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AdminSideBar = () => {
  const [selectedPage, setSelectedPage] = useState<string | '/hotels'>('/hotels');

  const handleSelect = (uri: string) => {
    setSelectedPage(uri);
    router.push(uri);
  };

  const router = useRouter();

  return (
    <div data-cy="AdminSideBar" className="w-60 max-h-full bg-white border-r border-r-[#E2E8F0] ">
      <div className="w-full max-h-full sticky top-0">
        <div className="w-full h-16 p-2  ">
          <div className="w-56 h-[3.25rem] p-2 gap-2 flex m-auto ">
            <div className="bg-[#2563eb] flex items-center justify-center rounded-lg w-8 h-8 ">
              <div className="bg-white rounded-full w-3 h-3 "></div>
            </div>
            <div className="h-8 w-36 flex flex-col justify-center">
              <h4 className="text-sm font-medium ">Pedia</h4>
              <p className="text-xs font-normal text-[#334155] ">Admin</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[92vh] flex flex-col items-center justify-between p-2 ">
          <div className="w-full h-20 flex flex-col gap-1 justify-start">
            <button
              onClick={() => {
                handleSelect('/hotels');
              }}
              className={
                selectedPage === '/hotels' ? 'bg-[#F4F4F5] flex gap-2 items-center min-w-32 h-8 rounded-sm px-2 py-1.5' : 'text-[#71717A] flex gap-2 items-center min-w-32 h-8 rounded-sm px-2 py-1.5'
              }
            >
              <Zap size={20} strokeWidth={2} /> Hotels
            </button>
            <button
              onClick={() => {
                handleSelect('/guests');
              }}
              className={
                selectedPage === '/guests' ? 'bg-[#F4F4F5] flex gap-2 items-center min-w-32 h-8 rounded-sm px-2 py-1.5' : 'text-[#71717A] flex gap-2 items-center min-w-32 h-8 rounded-sm px-2 py-1.5'
              }
            >
              <Zap size={20} strokeWidth={2} /> Guests
            </button>
          </div>
          <div className="w-full h-12 p-2 flex justify-between items-center ">
            <div className="flex gap-2 items-center">
              <div className="w-9 h-9 bg-slate-50 rounded-lg overflow-hidden">
                <Image src="/placeholder.png" width={36} height={36} alt="" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-medium ">admin</h4>
                <p className="text-xs font-normal text-[#334155] ">admin@pedia.com</p>
              </div>
            </div>

            <button className="flex items-center ">
              <LogOut size={21} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
