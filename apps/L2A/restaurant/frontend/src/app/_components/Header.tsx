import { IoIosNotificationsOutline } from 'react-icons/io';
import Logo from '../login/_components/Logo';
import { CiShoppingCart } from 'react-icons/ci';
import HomeSheet from './Sheet';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Notification } from '../_features/Notification';

const Header = () => {
  return (
    <div data-cy="Header" className="flex justify-between w-[100%] h-[56px] bg-[#F4F4F5]">
      <div className=" w-[36px] h-[26px] mt-[10px] ml-[15px]">
        <Logo />
      </div>
      <div className="flex justify-center items-center gap-4 mr-[20px]">
        <CiShoppingCart data-testid="shopping-cart-icon" className="w-[26px] h-[26px]" />
        <Sheet>
        < SheetTrigger>
        <IoIosNotificationsOutline data-testid="notification-icon" className="w-[26px] h-[26px]" />
        </SheetTrigger>
        <SheetContent><Notification/></SheetContent>
        </Sheet>
        <HomeSheet data-testid="home-sheet" />
      </div>
    </div>
  );
};
export default Header;
