import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { RiMenu3Line } from 'react-icons/ri';
import { GrHomeRounded } from 'react-icons/gr';
import { IoWalletOutline } from 'react-icons/io5';
import { MdOutlinePerson } from 'react-icons/md';
import { RiFilter3Line } from 'react-icons/ri';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const HomeSheet = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="btn">
          <RiMenu3Line />
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <button className="flex gap-2 border-b-2 border-b-gray-300  h-[68px] items-center mt-7">
              <GrHomeRounded className="w-[16px] h-[16px]" />
              <p>Нүүр хуудас</p>
            </button>
            <button className="flex gap-2 border-b-2 border-b-gray-300 h-[68px] items-center">
              <IoWalletOutline />
              <p> Хэтэвч</p>
            </button>
            <button className="flex gap-2 border-b-2 border-b-gray-300  h-[68px] items-center">
              <MdOutlinePerson />
              <p>Хэрэглэгч</p>
            </button>
            <button className="flex gap-2 border-b-2 border-b-gray-300 h-[68px] items-center">
              <RiFilter3Line />
              <p>Захиалгын түүх</p>
            </button>
            <Link href={'/user/information'}>
              <button className="flex gap-2 border-b-2 border-b-gray-300 h-[68px] items-center">
                <IoIosInformationCircleOutline />
                <p>Бидний тухай</p>
              </button>
            </Link>
          </SheetHeader>{' '}
          <Button className="bg-[#441500] w-[250px] h-[36px] mt-[500px]">Гарах</Button>
        </SheetContent>{' '}
      </Sheet>
    </div>
  );
};
export default HomeSheet;
