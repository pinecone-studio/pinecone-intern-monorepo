import { HeaderIcon } from './public/HeaderIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Header = () => {
  return (
    <>
      <div className=" bg-[#121316] py-1 px-6 flex justify-between max-w-[1440px] ">
        <div className="px-1 flex  items-center">
          <HeaderIcon />
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};
