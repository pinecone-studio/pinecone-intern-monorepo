'use client';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <div data-testid="sidebar" className="min-w-[240px] h-full border flex flex-col justify-between p-2 bg-white">
      <div className="p-2">
        <div className="flex px-2 py-[10px] gap-2">
        <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8C0 3.58172 3.58172 0 8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H8C3.58172 32 0 28.4183 0 24V8Z" fill="#2563EB"/>
<path d="M15.9997 22.6673C19.6816 22.6673 22.6663 19.6825 22.6663 16.0007C22.6663 12.3188 19.6816 9.33398 15.9997 9.33398C12.3178 9.33398 9.33301 12.3188 9.33301 16.0007C9.33301 19.6825 12.3178 22.6673 15.9997 22.6673Z" fill="#F8FAFC"/>
</svg>

          <div className="flex flex-col justify-center items-start">
            <h1 className="text-[#334155] text-sm font-semibold">Admin name</h1>
            <p className="text-[#334155] text-sm">Admin</p>
          </div>
        </div>
        <div className="mt-4">
          <Link href="/admin">
            <div
              className={`w-full flex justify-start  items-start p-2 gap-2 text-sm ${
                pathname === '/admin' ? ' text-[#334155]' : 'bg-transparent text-[#334155]'
              } hover:bg-gray-100 hover:text-black transition-colors`}
            >
              <LightningIcon />
              <p className=" text-sm">Hotels</p>
            </div>
          </Link>
          <Link href="/admin/guests">
            <div
              className={`w-full flex justify-start items-start p-2 ${
                pathname === '/admin/guests' ? ' text-[#334155]' : 'bg-transparent text-[#334155]'
              } hover:bg-gray-100 hover:text-black transition-colors`}
            >
              <LightningIcon />
              <span className="ml-2 text-sm">Guests</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="p-2">
        <div className="flex gap-2 justify-evenly items-center">
          <Image src="/image.png" alt="Profile image" height={32} width={48} />
          <div className="flex flex-col justify-center items-start w-[144px]">
            <p className="text-[#334155] text-sm font-semibold">Admin</p>
            <p className="text-[#334155] text-sm">Mail</p>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer">
            {' '}
            <IoIosArrowUp /> <IoIosArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export const LightningIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.66667 1.33203L1 9.33203H7L6.33333 14.6654L13 6.66536H7L7.66667 1.33203Z" stroke="#09090B" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
