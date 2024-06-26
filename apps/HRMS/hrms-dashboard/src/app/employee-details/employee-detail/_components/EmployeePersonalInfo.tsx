import { TbBriefcase2 } from 'react-icons/tb';
import { IoMdCall } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
export const EmployeePersonalinfo = () => {
  return (
    <div className="p-5 flex flex-col gap-10 w-[358px] ">
      <div data-testid="PersonalInfo">
        <p className="text-lg text-[#000000] font-semibold">Хувийн мэдээлэл</p>
      </div>
      <div className="flex justify-center" data-testid="Img">
        <div className="w-52 h-52 rounded-full bg-amber-200"></div>
      </div>
      <div data-testid="Name">
        <p className="text-lg text-[#000000] font-semibold text-center"> М.Ганбат</p>
      </div>
      <div className="flex justify-center">
        <div className="text-[#121316] text-base font-normal flex flex-col gap-4  text-start ">
          <div data-testid="job" className="flex  gap-4">
            <TbBriefcase2 className="w-6 h-6" />
            <p className=" flex flex-col">UX/UI Дизайнер</p>
          </div>
          <div data-testid="Call" className="flex  gap-4">
            <IoMdCall className="w-6 h-6" />
            <p>+97680556021</p>
          </div>
          <div data-testid="Email" className="flex  gap-4">
            <MdEmail className="w-6 h-6" />
            <p>Zoloosoko0526@gmail.com</p>
          </div>
          <div data-testid="Location" className="flex  gap-4">
            <FaLocationDot className="w-6 h-6" />
            <p>Ulaanbaatar ,Mongolia</p>
          </div>
        </div>
      </div>
    </div>
  );
};
