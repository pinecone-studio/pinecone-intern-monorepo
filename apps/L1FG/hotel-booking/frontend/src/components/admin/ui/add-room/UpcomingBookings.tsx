import { BiChevronUp } from 'react-icons/bi';
import { BiChevronDown } from 'react-icons/bi';
import { RxCountdownTimer } from 'react-icons/rx';

export const UpcomingBookings = () => {
  return (
    <div className="w-full border border-spacing-3 p-8 rounded-lg  bg-white ">
      <div className="w-[736px] flex items-center justify-between ">
        <div className=" font-Inter text-[#020617] text-lg font-semibold">Upcoming Bookings</div>
      </div>
      <div className="pt-3">
        <div className="bg-slate-300 h-[40px] rounded-lg flex items-center justify-between py-6 p-2">
          <div className="w-[82px] h-[40px]">
            <p>ID</p>
          </div>
          <div className="w-[346px] h-[40px] border-l-2">
            <p className="pl-2">Guest name</p>
          </div>
          <div className=" flex text-center justify-center w-[120px] h-[40px] border-l-2 ">
            <p className="pl-2">Status</p>
            <p className="pl-2">
              <BiChevronUp />
              <BiChevronDown />
            </p>
          </div>
          <div className="flex text-center w-[188px] h-[40px] justify-between border-l-2">
            <p className="pl-2">Date</p>
            <p>
              <BiChevronUp />
              <BiChevronDown />
            </p>
          </div>
        </div>
        <div className="flex justify-center pt-6">
          <RxCountdownTimer className="w-[24px] h-[24px]" />
        </div>
        <div className="text-center pt-4">
          <div className="text-[#09090B] font-semibold">
            <p>No Upcoming Bookings</p>
          </div>
          <div className=" text-xs text-[#71717A] pt-4">
            <p>You currently have no upcoming stays. Your future bookings will appear here once confirmed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
