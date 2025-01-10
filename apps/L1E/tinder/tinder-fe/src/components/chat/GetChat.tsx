import { useGetConversationQuery } from '@/generated';
import { MessageSquareDashed } from 'lucide-react';

interface ChatProps {
  sender: string;
  chosenUserId: string;
}

const GetChat: React.FC<ChatProps> = ({ sender, chosenUserId }) => {
  const { data } = useGetConversationQuery({
    variables: {
      userOne: sender,
      userTwo: chosenUserId,
    },
    // pollInterval: 1000,
  });

  console.log(data);

  if (!data || !data.getConversation) {
    return <div>No conversation data available.</div>;
  }

  const { messages } = data.getConversation;

  return (
    <div>
      <div className="flex flex-col gap-4 items-center mt-4">
        <MessageSquareDashed data-testid="message-square-dashed" />
        <div className="flex flex-col gap-1 items-center">
          <div className="text-sm">Say hi</div>
          <div className="text-[#71717A] text-sm">You ve got a match! Send a message to start chatting.</div>
        </div>
      </div>

      {messages.map((message, index) => (
        <div key={index} className={`flex w-full ${message.sender === sender ? 'justify-end' : 'justify-start'}`}>
          <div className="font-medium text-base flex gap-2 flex-col">
            <div className="flex flex-col gap-2">
              {message.sender !== sender ? (
                <div className="flex pl-4 pt-4 items-center gap-2">
                  <img src={data.getConversation?.userTwo?.images[0]} alt="User Profile" className="rounded-full w-8 h-8" />
                  <div className="flex bg-gray-200 p-2 rounded-xl justify-end">{message.text}</div>
                </div>
              ) : (
                <div className="flex pt-4 pr-4 items-center gap-2">
                  <div className="flex bg-blue-600 p-2 rounded-xl text-white justify-start">{message.text}</div>
                  <img src={data.getConversation?.userOne?.images[0]} alt="User Profile" className="rounded-full w-8 h-8" />
                </div>
              )}

              <div className={`w-full text-sm ${message.sender !== sender ? 'text-left pl-4' : 'text-right pr-4'} font-thin`}>{/* You can add formatted time here if you want */}</div>
            </div>

            <div className="w-4 h-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetChat;
