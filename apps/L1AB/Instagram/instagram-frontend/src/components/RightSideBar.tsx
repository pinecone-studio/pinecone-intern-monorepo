import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const RightSideBar = () => {
  return (
    <div className="flex flex-col w-[326px]">
      <div className="flex w-full h-[56px] justify-between items-center">
        <div className="flex items-center gap-3 ">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Test</h3>
            <h4>test</h4>
          </div>
        </div>
        <p className="text-[11px] font-semibold text-[#2563EB]">Log out</p>
      </div>
    </div>
  );
};

export default RightSideBar;
