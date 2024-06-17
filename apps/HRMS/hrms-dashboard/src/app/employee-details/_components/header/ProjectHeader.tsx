import { HeaderIcon } from './public/HeaderIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ProjectHeader = () => {
  return (
    <>
      <div data-testid="Header" className=" bg-[#121316] py-1 px-6 flex justify-between  ">
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
