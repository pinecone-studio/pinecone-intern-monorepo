import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquareDashed, Send } from 'lucide-react';

const MainChat = () => {
  return (
    <div className="w-screen flex flex-col justify-center items-center  pt-4 bg-transparent">
      <div className="max-w-[1280px] w-screen flex justify-between">
        <div className="flex flex-col gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col h-screen max-h-[580px] justify-between ">
          <div className="flex max-w-[960px] justify-between w-screen">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex w-[217px] gap-3 h-[40px]">
              <button className="w-[117px] py-2 px-4 border-[1px] rounded-[4px] border-gray-200">View pro</button>
              <button className="w-[117px] py-2 px-4 border-[1px] rounded-[4px] border-gray-200">Unmatch</button>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <MessageSquareDashed />

            <div className="flex flex-col gap-1 items-center">
              <div className="text-smr">Say hi</div>
              <div className="text-[#71717A] text-sm">You’ve got a match! Send a message to start chatting.</div>
            </div>
          </div>
          <div className="flex max-w-[960px] gap-4 px-6 py-5 w-screen">
            <input className="rounded-[12px] border-[1px] border-gray-200 w-[800px] p-2" placeholder="Say something nice" />
            <button className="flex items-center w-[91px] h-[40px] bg-[#e11d48] text-white justify-center gap-2 rounded-full">
              <Send className="w-4 h-4" />
              <div className="text-sm">Send</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
