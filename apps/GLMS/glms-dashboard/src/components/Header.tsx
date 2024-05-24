/* eslint-disable */
'use client';
import { SearchIcon } from '../../public/assets/SearchIcon';
const jwt = require('jsonwebtoken');
import { PositionIcon } from '../../public/assets/HeaderPosition';
import { Logo } from '../../public/assets/Logo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LeaveIcon } from '../../public/assets/LeaveIcon';
const Header = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/');
    const token = localStorage.getItem('token');
    const data = jwt.decode(token);
    setEmail(data?.email);
  }, []);
  return (
    <div data-testid="header-artivle-detail" className="bg-[#F7F7F8] border-b-[1px] border-[#ECEDF0] ">
      <div className="flex h-12 items-center justify-between w-[85vw] m-auto">
        <div
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          <Logo />
        </div>
        <div data-testid="text-data-search" className="gap-7 items-center flex ">
          <label className="input input-bordered flex items-center gap-2 h-8 outline-none">
            <SearchIcon />
            <input type="text" className="grow text-sm w-32 " placeholder="Search" />
          </label>
          <PositionIcon />
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="w-8 h-8">
              <img className="rounded-full" src="/profile-image.svg" />
            </div>
            <span className="font-semibold">{email}</span>
          </div>
          <div
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/');
            }}
            className="cursor-pointer flex items-center gap-1 hover:bg-[#ededed] p-2 rounded-full"
          >
            <LeaveIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
