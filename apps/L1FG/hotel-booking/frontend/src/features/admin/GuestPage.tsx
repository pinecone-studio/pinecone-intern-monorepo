import { Header } from '@/components/admin/main/Header';
import { Sidebar } from '@/features/admin/main/Sidebar';

export const GuestsPage = () => {
  return (
    <div className="flex">
      <Sidebar hotels="" guests="active" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full bg-[#F4F4F5] p-4 flex flex-col gap-4">
          <p className="h-10 flex items-center font-Inter text-2xl font-semibold -tracking-[0.6px] text-[#020617]">Guests</p>
        </div>
      </div>
    </div>
  );
};
