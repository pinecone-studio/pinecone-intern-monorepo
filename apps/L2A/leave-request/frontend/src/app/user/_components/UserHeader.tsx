'use client';

import Image from 'next/image';

const UserHeader = () => {
  return (
    <div className="w-full h-screen bg-gray-100 text-black">
      <div className="w-full h-20vh bg-[#FFFFFF] ">
        <div className="flex justify-between items-center px-4 mt-4 ml-2">
          <div className="flex justify-start items-center gap-4 text-black ">
            <div>
              <Image src="/images/Logo.png" alt="Logo" width={100} height={40} />
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 text-black mr-4">
            <div>
              <Image src="/images/Avatar.png" alt="Avatar" width={40} height={40} className="rounded-full" />
            </div>
          </div>
        </div>

        <div className=" flex justify-start items-end mt-4 ml-4">
          <button data-testid="My-request" className="text-md p-2">
            My request
          </button>
          <button data-testid="Request-Form" className="ml-4 text-md p-2">
            Request Form
          </button>
          <button data-testid="Leave-Calendar" className="ml-4 text-md p-2">
            Leave Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
