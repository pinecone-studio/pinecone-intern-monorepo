import { MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const LoggedinHeader = () => {
  return (
    <div className="w-screen flex justify-center items-center  pt-4 bg-transparent">
      <div className="max-w-[1280px] w-screen flex justify-between">
        <div className="flex items-center">
          <img data-testid="test" className="w-[100px] h-[24px]" src="redlogo.png" alt="" />
        </div>
        <div className="flex w-[96px] items-center justify-between h-[40px]">
          <MessageSquare className="w-4 h-4" />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default LoggedinHeader;
