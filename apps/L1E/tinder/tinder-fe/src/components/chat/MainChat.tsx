import { Match } from '@/generated';
import { MessageSquareDashed, Send } from 'lucide-react';

type MatchesProps = {
  matches: Match[];
  username: string | null;
};

const ChatInterface: React.FC<MatchesProps> = ({ matches, username }) => {
  console.log(matches);

  return (
    <div className="flex flex-col h-full border-l-[1px] border-[#4e4e7] justify-between ">
      <div className="flex max-w-[960px] justify-between items-center border-b-[1px] p-4 border-[#4e4e7] w-screen">
        {username}
        <div className="flex w-[217px] gap-3 h-[40px]">
          <button className="w-[117px] py-2  border-[1px] rounded-[4px] border-gray-200">View profile</button>
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
  );
};

export default ChatInterface;
