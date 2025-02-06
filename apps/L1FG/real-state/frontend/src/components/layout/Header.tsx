import { Button } from '@/components/ui/button';
import { HomeLogo } from './icons/HomeLogo';
import { PlusIcon } from './icons/PlusIcon';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="w-full h-16 border-b border-[#E4E4E7]  bg-white px-8 flex items-center ">
      <div className="w-full h-10 flex items-center justify-between mx-auto text-sm font-medium">
        <Link href={'/'}>
          <HomeLogo />
        </Link>
        <div className="flex gap-4 items-center">
          <Link href={'/add-estate'}>
            <Button className="w-[142px] bg-orange-500 gap-2 flex items-center">
              <PlusIcon />
              <p>Зар Оруулах</p>
            </Button>
          </Link>
          <Link href={'/my-estates'}>
            <p>Миний Зарууд</p>
          </Link>
          <Link href={'/login'}>
            <p>Нэвтрэх</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
