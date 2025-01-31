'use client';
import { Bell } from 'lucide-react';
import { NotificationBell } from '../svg/NorificationBell';
import { Close } from '../svg/Close';
import Link from 'next/link';

const Notifcation = () => {
  return (
    <div className="max-w-full" data-testid="order-page">
      <div className="flex items-center justify-between border border-gray-300 w-full h-[80px] sm:h-[100px] px-4 sm:px-10 lg:px-20">
        <Bell data-testid="bell-icon" width={24} className="mt-2 sm:mt-6" />
        <Link href={'/'}>
          <button className="mt-2 sm:mt-6">
            <Close />
          </button>
        </Link>
      </div>

      <div className="flex flex-col pt-4 sm:pt-6 px-4">
        <div className="text-[#441500] font-bold text-lg sm:text-xl lg:text-2xl ml-5">Мэдэгдэл</div>
      </div>

      <div className="mt-10 sm:mt-20 flex flex-col gap-6 sm:gap-10 items-center justify-center max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-20">
        {[
          { id: '#32193', text: 'Таны захиалсан хоол баталгаажлаа.', status: 'Хүлээгдэж буй', time: '24.10.19 15:25' },
          { id: '#32193', text: 'Таны захиалга хийгдэг эхэллээ.', status: 'Бэлтгэгдэж буй', time: '24.10.19 12:37' },
          { id: '#33998', text: 'Таны захиалга бэлтгэгдэж дууслаа.', status: 'Амжилттай', time: '24.10.19 13:21' },
          { id: '#34021', text: 'Таны захиалга амжилттай хүргэгдлээ.', status: 'Амжилттай', time: '24.10.19 12:47' },
        ].map(({ id, text, status, time }, index) => (
          <div key={index} className="flex w-full max-w-[1000px] min-w-[240px] justify-center rounded-lg border-2 border-gray-300 shadow-md bg-white p-4 sm:p-6">
            <div className="ml-2 sm:ml-5">
              <NotificationBell />
            </div>
            <div className="ml-2 sm:ml-5 text-sm sm:text-base">
              <h1 className="font-semibold">
                {id} {text}
              </h1>
              <div className="flex gap-2 pt-3 sm:pt-5">
                <button className="border-2 border-gray-300 rounded-lg font-bold w-[140px] min-w-[100px] py-1">{status}</button>
                <h1 className="text-gray-600 w-[100px] flex justify-end">{time}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifcation;
