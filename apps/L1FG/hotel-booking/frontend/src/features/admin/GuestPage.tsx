import { Header } from '@/components/admin/main';
import { Sidebar } from './main/Sidebar';
import { GuestDataTable, SelectStatus } from '@/components/admin/ui';

export const GuestsPage = () => {
  return (
    <div className="flex">
      <Sidebar hotels="" guests="active" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full bg-[#F4F4F5] flex justify-center">
          <div className="max-w-[1654px] w-full h-full p-4 flex flex-col gap-4">
            <p className="h-10 flex items-center font-Inter text-2xl font-semibold -tracking-[0.6px] text-[#020617]">Guests</p>
            <div className="flex gap-2">
              <input type="text" className="px-3 py-2 w-full outline-none border border-[#E4E4E7] rounded-[6px] text-[#09090B] font-Inter text-sm font-normal h-10" placeholder="Search" />
              <SelectStatus />
            </div>
            <GuestDataTable />
          </div>
        </div>
      </div>
    </div>
  );
};
