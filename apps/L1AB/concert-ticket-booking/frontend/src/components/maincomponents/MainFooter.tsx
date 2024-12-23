import { GoDotFill } from 'react-icons/go';
import { MdOutlineEmail } from 'react-icons/md';
import { IconType } from 'react-icons';
import { MdOutlineHeadphones } from 'react-icons/md';
import { LuPhone } from 'react-icons/lu';
import { Container } from './Container';

export const MainFooter = () => {
  interface AddressMockType {
    icon: IconType;
    name: string;
    desc: string;
  }

  const AddressMock: AddressMockType[] = [
    {
      icon: MdOutlineEmail,
      name: 'Email:',
      desc: 'support@ticketinbooking.mn',
    },
    {
      icon: LuPhone,
      name: 'Phone:',
      desc: '+976 (11) 123-4567',
    },
    {
      icon: MdOutlineHeadphones,
      name: 'Customer Support:',
      desc: 'Available 24/7',
    },
  ];

  return (
    <Container>
      <div className="border-t dark:border-[#27272A] border-[#c6c6c6] py-24 px-28 flex justify-between items-center max-sm:grid  max-sm:px-4 max-sm:py-4  max-md:px-4 max-md:py-4 max-lg:px-4 max-lg:py-4  max-xl:px-4 max-xl:py-4  ">
        <div className="h-fit  ">
          <div className="flex items-center max-sm:justify-center  max-md:justify-center max-lg:justify-center max-xl:justify-center">
            <GoDotFill className="w-8 h-8 text-[#00B7F4]" />
            <h1 className="root:text-black font-semibold text-xl dark:text-white">TICKET BOOKING</h1>
          </div>
          <p className="text-gray-400 text-sm font-normal ml-2  ">© 2024 Booking Mongolia. All Rights Reserved.</p>
        </div>
        <div className="flex flex-col gap-3 max-sm:py-4 max-md:py-4 max-xl:py-4">
          <p className="text-gray-400 text-sm font-normal ">Contact Information</p>
          <div className="flex gap-12 max-sm:grid max-sm:gap-4 max-md:grid max-md:gap-4 max-lg:grid max-lg:gap-4 ">
            {AddressMock.map((item, index) => (
              <div key={index} className="flex items-center root:text-black gap-4">
                <item.icon />
                <div>
                  <p className="font-light text-sm text-gray-400">{item.name}</p>
                  <p className="font-light text-sm root:text-black dark:text-white">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
