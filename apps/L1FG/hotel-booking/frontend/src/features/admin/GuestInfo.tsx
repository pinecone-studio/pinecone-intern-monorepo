import { Footer } from '@/components/admin/main/Footer';
import { Header } from '@/components/admin/main/Header';
import { Sidebar } from '@/features/admin/main/Sidebar';
import { LeftArrow } from '@/components/admin/svg';
import { GuestInfoLeft, GuestInfoRight } from '@/components/admin/ui';
import Link from 'next/link';

export const GuestInfo = () => {
  return (
    <div className="flex">
      <Sidebar hotels="" guests="active" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full flex justify-center bg-[#F4F4F5]">
          <div className="py-4 flex flex-col gap-4 max-w-[1200px] w-full">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/guests"
                className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4F4F5] duration-200"
              >
                <LeftArrow />
              </Link>
              <p className="font-Inter text-[#020617] text-lg font-semibold">Shagai Nyamdorj</p>
            </div>
            <div className="flex gap-4">
              <div className="max-w-[744px] w-full">
                <GuestInfoLeft />
              </div>
              <GuestInfoRight />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
