import Image from 'next/image';
import { Shop } from '../../../public/svg';
import { Notification } from '../../../public/svg';
import { Menu } from '../../../public/svg';

const Header = () => {
  return (
    <div className="mt-[48px]">
      <div className="flex w-full justify-between items-center border-b px-4 py-2 fixed top-0 right-0 bg-white z-10">
        <Image src="/Logo.png" alt="logo" width={28} height={32} />
        <div className="flex gap-1">
          <Shop />
          <Notification />
          <Menu />
        </div>
      </div>
    </div>
  );
};
export default Header;
