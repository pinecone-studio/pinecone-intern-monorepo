'use client';

import { MdAccessTime } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';
import { UserHistoryDialog } from './UserHistoryDialog';
import { useGetBookingByUserIdQuery } from '@/generated';
import { useAuth } from '../providers';
import { useRouter } from 'next/navigation';

export const UserHistory = () => {
  const { user } = useAuth();
  const { data: bookings } = useGetBookingByUserIdQuery({
    variables: { userId: user?._id as string },
    skip: !user?._id,
  });
  const router = useRouter();

  const getColorForVenue = (name: string | undefined): string => {
    if (name === 'Энгийн') return '#D7D7F8';
    if (name === 'Fanzone') return '#C772C4';
    if (name === 'Vip') return '#4651C9';
    return '#D7D7F8';
  };
  const isWithin24Hours = (updatedAt: string): boolean => {
    const updatedDate = new Date(updatedAt);
    const now = new Date();
    const timeDifference = now.getTime() - updatedDate.getTime();
    return timeDifference <= 24 * 60 * 60 * 1000;
  };
  return (
    <div className="w-full h-fit flex flex-col gap-6" data-cy="Profile-Page-History">
      <p className="font-semibold text-2xl dark:text-white text-black max-sm:text-xl">Захиалгын мэдээлэл</p>
      {bookings?.getBookingByUserId.map((item, index) => {
        const showButton = item.status === 'Баталгаажсан' && isWithin24Hours(item.updatedAt);
        return (
          <div className="p-8 grid gap-4 dark:text-[#FAFAFA] dark:bg-[#131313] bg-[#f2f2f2] rounded-xl" key={index}>
            <div className="flex justify-between items-center text-base font-normal text-white max-sm:grid max-md:grid max-xl:grid">
              <div className="flex gap-4 max-sm:grid max-md:grid max-xl:grid">
                <div className="flex gap-2">
                  <p className="text-[#878787]">Захиалгын дугаар: </p>
                  <p className="text-black dark:text-white">{item._id}</p>
                </div>
                <div className="flex text-base font-normal dark:text-white text-black items-center gap-2">
                  <MdAccessTime />
                  <p>{item.createdAt.slice(0, 10)}</p>
                </div>
                <div className="flex text-base font-normal text-white items-center gap-2">
                  <p className="text-[#878787] max-sm:text-sm">Төлөв:</p>
                  <p className=" dark:text-white  text-blue-500 ">{item.status}</p>
                </div>
              </div>
              {showButton && <UserHistoryDialog bookingId={item._id} />}
              {item.status === 'Баталгаажаагүй' && (
                <div data-testid="Баталгаажаагүй" className=" dark:text-white cursor-pointer text-blue-500 hover:underline" onClick={() => router.push(`/order/${item._id}`)}>
                  Захиалга үргэлжлүүлэх
                </div>
              )}
              {item.status === 'Төлбөр хүлээгдэж буй' && (
                <div data-testid="Төлбөр хүлээгдэж буй" className=" dark:text-white cursor-pointer text-blue-500 hover:underline" onClick={() => router.push(`/payment/${item._id}`)}>
                  Захиалга үргэлжлүүлэх
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 max-sm:grid max-md:grid max-xl:grid">
              {item.venues?.map((venue, index2) => {
                const color = getColorForVenue(venue?.name ?? undefined);
                return (
                  <div key={index2} className="border px-6 py-4 flex justify-between rounded-lg border-dashed border-[#27272A]">
                    <div className="flex items-center gap-2 text-sm font-bold hover:text-[#00B7F4] dark:text-white text-black">
                      <GoDotFill className="w-8 h-8" style={{ color }} />
                      <p>{venue?.name}</p>
                    </div>
                    <div className="flex items-center font-normal text-base gap-2">
                      <span className="text-[#878787] max-sm:text-sm">{venue?.price}₮</span>
                      <span className="text-[#878787] max-sm:text-sm">x {venue?.quantity}</span>
                      <span className="max-sm:text-sm">{(venue?.price || 0) * (venue?.quantity || 1)}₮</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between max-sm:grid max-md:grid">
              <div className="flex gap-2 px-6 py-3 flex-1 items-center">
                <p className="text-sm font-light leading-5">Тоглолтын нэр:</p>
                <span className="text-xl font-bold">{item.eventId.name}</span>
              </div>
              <div className="flex gap-2 px-6 py-3 flex-1 items-center justify-end">
                <p className="text-sm font-light leading-5">Төлсөн дүн:</p>
                <span className="text-xl font-bold">{item.amountTotal}₮</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
