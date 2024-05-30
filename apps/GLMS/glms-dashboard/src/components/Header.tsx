'use client';
import { SearchIcon } from '../../public/assets/SearchIcon';
import { Logo } from '../../public/assets/Logo';
import { useRouter } from 'next/navigation';
import { LeaveIcon } from '../../public/assets/LeaveIcon';
import { Light } from '../../public/assets/LightIcon';
import { Dark } from '../../public/assets/DarkIcon';
import { useTheme } from '../common';
const Header = () => {
  const router = useRouter();
  const { isDark, darkModeHandler } = useTheme();

  return (
    <div data-testid="header-artivle-detail" className="bg-[#F7F7F8] border-b-[1px] border-[#ECEDF0] dark:border-[#3d3d3def] dark:bg-[#121316ec] ">
      <div className="flex h-12 items-center justify-between w-[85vw] max-w-[1440px] m-auto">
        <div
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          <Logo />
        </div>
        <div data-testid="text-data-search" className="gap-7 items-center flex fill-[#121316] dark:fill-[#ededed]">
          <label className="input input-bordered flex items-center gap-1 h-8 outline-none dark:bg-[#3d3d3def]">
            <SearchIcon />
            <input type="text" className="grow text-sm dark:text-[#ededed] w-32 " placeholder="Search" />
          </label>
          <div
            onClick={darkModeHandler}
            className="cursor-pointer flex gap-1 hover:bg-[#ededed] dark:hover:bg-[#3d3d3def] justify-center items-center  w-9 h-9 rounded-full stroke-[#121316] dark:stroke-[#ededed]"
          >
            {!isDark ? <Light /> : <Dark />}
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <div className="w-8 h-8">
              <img className="rounded-full" src="/profile-image.svg" />
            </div>
          </div>
          <div
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/');
            }}
            className="cursor-pointer flex gap-1 hover:bg-[#ededed] dark:hover:bg-[#3d3d3def] justify-center items-center  w-9 h-9 rounded-full stroke-[#121316] dark:stroke-[#ededed]"
          >
            <LeaveIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
