import Image from 'next/image';

import { SheetMenu } from './Sheetmenu';
import { SheetMenuNotif } from './SheetMenuNotif';
import { SheetMenuShop } from './SheetMenuShop';

export const Navbar = () => {
  return (
    <div className="w-full  px-4 h-[56px] border-b flex ">
      <a href="/" className="w-2/3  py-4 h-[56px]">
        <Image className="w-[24px] h-[30px]" alt="Logo" width={50} height={50} src={'/log2.png'} />
      </a>
      <div className="w-1/3 py-4 flex items-center justify-between">
        <SheetMenuShop />
        <SheetMenuNotif />
        <SheetMenu />
      </div>
    </div>
  );
};
