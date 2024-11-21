import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const RightSideBar = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col w-[326px]">
      <div className="flex w-full h-[56px] justify-between items-center">
        <div className="flex items-center gap-3 ">
          <Avatar className="size-14">
            <AvatarImage src={user && user.profilePicture} alt="@shadcn" />
            <AvatarFallback>{user && user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{user && user.username}</h3>
            <h4>{user && user.fullname}</h4>
          </div>
        </div>
        <p className="text-[11px] font-semibold text-[#2563EB]">Log out</p>
      </div>
    </div>
  );
};

export default RightSideBar;
