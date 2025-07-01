import Image from 'next/image';
import { Menu } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { Bell } from 'lucide-react';
export const Navbar = () => {
  return (
    <div className="w-full  px-4 h-[56px] border-b flex ">
      <div className="w-2/3  py-4 h-[56px]">
        <Image className="w-[20px] h-[30px]" alt="" width={50} height={50} src={'/logo.png'} />
      </div>
      <div className="w-1/3 py-4 flex items-center justify-between">
        <ShoppingCart size={15} />
        <Bell size={15} />
        <Menu size={15} />
      </div>
    </div>
  );
};
