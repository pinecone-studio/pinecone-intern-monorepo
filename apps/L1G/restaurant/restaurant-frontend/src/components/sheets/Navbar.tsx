import Image from 'next/image';

import { SheetMenuNotif } from './SheetMenuNotif';
import { SheetMenuShop } from './SheetMenuShop';
import { SheetMenu } from './SheetMenu';

export const Navbar = () => {
  return (
    <div className="w-full  px-4 h-[56px] border-b flex justify-between ">
      <a href="/" className="w-2/3  py-4 h-[56px]">
        <Image className="w-[24px] h-[30px]" alt="Logo" width={50} height={50} src={'/log2.png'} />
      </a>
      <div className="w-1/3 py-4 flex items-center justify-between max-w-[300px]">
        <SheetMenuShop />
        <SheetMenuNotif />
        <SheetMenu />
      </div>
    </div>
  );
};
