import { HeaderIcon } from './public/HeaderIcon';

import Image from 'next/image';
import HeaderProjectImg from './public/Avatar.svg';
import Link from 'next/link';
export const ProjectHeader = () => {
  return (
    <>
      <div data-testid="Header" className=" bg-[#121316] py-1 px-6  ">
        <div className="flex justify-between max-w-[1304px] mx-auto">
          <div className="px-1 flex  items-center">
            <Link href="/">
              <HeaderIcon />
            </Link>
          </div>
          <div className="py-[2px] pr-1 pl-2 ">
            <Image className="  w-8 h-8  rounded-[100px] " src={HeaderProjectImg} alt="Header project Image" />
          </div>
        </div>
      </div>
    </>
  );
};
