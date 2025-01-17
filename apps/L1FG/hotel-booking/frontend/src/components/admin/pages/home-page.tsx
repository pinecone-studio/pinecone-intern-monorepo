import Link from 'next/link';
import { Header } from '../main/Header';
import { Sidebar } from '../main/Sidebar';
import { Plus } from '../svg';

export const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar hotels="active" guests="" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full bg-[#F4F4F5] p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="font-Inter text-2xl font-semibold -tracking-[0.6px] text-[#020617]">Hotels</p>
            <Link href="/admin/add-hotel" className="px-8 py-2 flex items-center gap-2 bg-[#2563EB] hover:bg-[#2550eb] duration-200 rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] h-10">
              <Plus />
              <p className="text-[#FAFAFA] font-Inter text-sm font-medium">Add Hotel</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
