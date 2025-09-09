import Image from 'next/image';
import { SheetMenu } from './sheets/Sheetmenu';
import { Camera } from 'lucide-react';

export const Navbar = () => {
  return (
    <div className="w-full  px-4 h-[56px] border-b flex justify-between sticky top-0 bg-white z-10">
      <a href="/" className=" py-4 h-[56px]">
        <Image className="w-[24px] h-[30px]" alt="Logo" width={50} height={50} src={'/log2.png'} />
      </a>

      <div className="py-4 flex items-center gap-4">
        <a href="/camera">
          <Camera size={15} />
        </a>
        <SheetMenu />
      </div>
    </div>
  );
};
