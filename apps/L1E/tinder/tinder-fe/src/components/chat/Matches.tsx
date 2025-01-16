import { Match, useGetAllConversationsQuery, useGetConversationQuery } from '@/generated';
import ChatInterface from './MainChat';
import { useSearchParams } from 'next/navigation';

type MatchesProps = {
  handleAddToRecentChats: (_username: string) => Promise<void>;
  matches: Match[];
  user: any;
};

const Matches: React.FC<MatchesProps> = ({ handleAddToRecentChats, matches, user }) => {
  const searchParams = useSearchParams();
  const { data } = useGetAllConversationsQuery();

  const username = searchParams.get('username');

  const currentMatch = matches?.find((match) => match?.targetUserId?.username === username || match?.userId?.username === username);
  const targetUser = currentMatch?.targetUserId?.username === username ? currentMatch?.targetUserId : currentMatch?.userId;
  const userone = currentMatch?.targetUserId?.username !== username ? currentMatch?.targetUserId : currentMatch?.userId;

  const { data: data1 } = useGetConversationQuery({
    variables: {
      userOne: currentMatch?.targetUserId?._id || '',
      userTwo: currentMatch?.userId?._id || '',
    },
    pollInterval: 1000,
  });

  return (
    <div className="w-screen pt-12 flex justify-center h-screen bg-transparent">
      <div className="max-w-[1180px] flex-col w-screen pt-6 h-full flex justify-between">
        <div className="items-start gap-2 flex flex-col h-[15%]">
          <h2>Matches</h2>
          <div className="flex gap-20">
            {matches?.map((match) => {
              const isCurrentUser = match.userId?._id === user._id;
              const targetUser = isCurrentUser ? match.targetUserId : match.userId;
              return (
                <div key={targetUser?._id}>
                  <button data-testid="button" onClick={() => handleAddToRecentChats(targetUser?._id || '')} className={`flex flex-col pt-4 items-center '} justify-center gap-2`}>
                    <img src={targetUser?.images?.[0] || 'default-image.png'} alt="User Image" className="w-10 h-10 rounded-full" />
                    <div className="text-sm flex">
                      <div>{targetUser?.username}</div>
                      <div>, {targetUser?.age}</div>
                    </div>
                    <div className="text-[#71717a]">{targetUser?.profession}</div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="max-w-[1180px] w-screen border-l-transparent h-[80%] border-[1px] border-[#4e4e7] flex justify-between">
          <div className={`flex flex-col p-4 gap-4 `}>
            {data?.getAllConversations
              .filter((el) => el.userOne?._id === user._id || el.userTwo?._id === user._id)
              .map((el, index) => {
                const isUserOne = el.userOne?._id === user._id;
                const otherUser = isUserOne ? el.userTwo : el.userOne;

                return (
                  <div key={index}>
                    <div className="flex pb-5 pt-3 border-b-[1px] gap-4">
                      <img src={otherUser?.images?.[0]} alt="User Image" className="w-[50px] h-[50px] rounded-full object-cover border-2 border-gray-300" />
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <div>{otherUser?.username},</div>
                          <div>{otherUser?.age}</div>
                        </div>
                        <div className="text-[#71717a]">{otherUser?.profession}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <ChatInterface data1={data1} targetUser={targetUser} userone={userone} currentMatch={currentMatch} matches={matches as Match[]} />
        </div>
      </div>
    </div>
  );
};

export default Matches;
