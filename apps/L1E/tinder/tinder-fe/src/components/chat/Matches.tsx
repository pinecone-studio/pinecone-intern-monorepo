import { Match } from '@/generated';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import ChatInterface from './MainChat';

import { useSearchParams } from 'next/navigation';

type MatchesProps = {
  // eslint-disable-next-line no-unused-vars
  handleAddToRecentChats: (username: string) => Promise<void>;
  matches: Match[];
};

const Matches: React.FC<MatchesProps> = ({ handleAddToRecentChats, matches }) => {
  const searchParams = useSearchParams();

  const username = searchParams.get('username');

  return (
    <div className="w-screen flex justify-center h-screen  pt-12 bg-transparent">
      <div className="max-w-[1180px] flex-col w-screen  pt-6 h-full flex gap-2">
        <div className="items-start">
          <h2>Matches</h2>
          <div className="flex gap-4">
            {matches?.map((match, index) => (
              <div key={index}>
                <button onClick={() => handleAddToRecentChats(match.targetUserId._id)} className="flex flex-col pt-4 items-center justify-center gap-1">
                  <img src={match.targetUserId.images[0]} alt="User Image" className="w-10 h-10 rounded-full" />
                  <div className="text-sm flex">
                    <div>{match.targetUserId.username}</div>
                    <div>, {match.targetUserId.age}</div>
                  </div>
                  <div className="text-[#71717a]">{match.targetUserId.profession}</div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1180px] w-screen border-l-transparent h-full border-[1px] border-[#4e4e7] flex justify-between">
          <div className="flex flex-col p-4 gap-4">
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
          <ChatInterface username={username} matches={matches as Match[]} />
        </div>
      </div>
    </div>
  );
};

export default Matches;
