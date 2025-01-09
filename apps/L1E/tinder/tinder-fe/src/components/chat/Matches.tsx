import { Match, useGetAllConversationsQuery } from '@/generated';

import ChatInterface from './MainChat';

import { useSearchParams } from 'next/navigation';

type MatchesProps = {
  // eslint-disable-next-line no-unused-vars
  handleAddToRecentChats: (username: string) => Promise<void>;
  matches: Match[];
};

const Matches: React.FC<MatchesProps> = ({ handleAddToRecentChats, matches }) => {
  const searchParams = useSearchParams();
  const { data } = useGetAllConversationsQuery();

  const username = searchParams.get('username');

  return (
    <div className="w-screen flex justify-center h-screen  pt-12 bg-transparent">
      <div className="max-w-[1180px] flex-col w-screen  pt-6 h-full flex gap-2">
        <div className="items-start">
          <h2>Matches</h2>
          <div className="flex gap-4">
            {matches?.map((match) => (
              <div key={match.targetUserId?._id}>
                <button data-testid="button" onClick={() => handleAddToRecentChats(match.targetUserId?._id || '')} className="flex flex-col pt-4 items-center justify-center gap-1">
                  <img src={match.targetUserId?.images[0]} alt="User Image" className="w-10 h-10 rounded-full" />
                  <div className="text-sm flex">
                    <div>{match.targetUserId?.username}</div>
                    <div>, {match.targetUserId?.age}</div>
                  </div>
                  <div className="text-[#71717a]">{match.targetUserId?.profession}</div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1180px] w-screen border-l-transparent h-full border-[1px] border-[#4e4e7] flex justify-between">
          <div className="flex flex-col  p-4 gap-4">
            {data?.getAllConversations.map((el, index) => {
              return (
                <div key={index}>
                  <div className="flex  py-2 border-b-[1px] gap-4">
                    <img src={el.userTwo?.images[0]} alt="User Image" className="w-[50px] h-[50px] rounded-full object-cover border-2 border-gray-300" />
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <div>{el.userTwo?.username},</div>
                        <div>{el.userTwo?.age}</div>
                      </div>
                      <div className="text-[#71717a]">{el.userTwo?.profession}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInterface username={username} matches={matches as Match[]} />
        </div>
      </div>
    </div>
  );
};

export default Matches;
