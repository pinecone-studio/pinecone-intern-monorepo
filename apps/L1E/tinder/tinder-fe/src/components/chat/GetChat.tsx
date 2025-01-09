/* eslint-disable complexity */
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
  });

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
      {messages.map((message) => (
        <div key={message.id} className="p-2">
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default GetChat;
