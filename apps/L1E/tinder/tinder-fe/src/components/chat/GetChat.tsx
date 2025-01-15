import { MessageSquareDashed } from 'lucide-react';
import { ReactElement, JSXElementConstructor, ReactNode, useRef, useEffect, PromiseLikeOfReactNode } from 'react';

interface Message {
  timestamp: string;
  sender: string;
  images: string[];
  text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | PromiseLikeOfReactNode | null | undefined;
}

interface Conversation {
  messages: Message[];
  userTwo: {
    images: string[];
  };
}

interface ChatProps {
  sender: string;
  data1: {
    getConversation?: Conversation;
  };
}

const GetChat: React.FC<ChatProps> = ({ sender, data1 }) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data1?.getConversation?.messages]);

  if (!data1 || !data1.getConversation) {
    return (
      <div className="flex flex-col gap-4 items-center mt-4">
        <MessageSquareDashed data-testid="message-square-dashed" />
        <div className="flex flex-col gap-1 items-center">
          <div className="text-sm">Say hi</div>
          <div className="text-[#71717A] text-sm">You’ve got a match! Send a message to start chatting.</div>
        </div>
      </div>
    );
  }

  const { messages } = data1.getConversation;

  const formatTimestamp = (timestamp: string) => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return !isNaN(date.getTime()) ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Invalid date';
  };

  const renderReceiverMessage = (message: Message, timestamp: string) => (
    <div className="flex flex-col items-start bg-[#f4f4f5] px-4 py-2 font-medium rounded-md gap-2">
      <div className="flex items-center gap-8">
        {message.text}
        {message.images && message.images[0] && <img src={message.images[0]} alt="Message Image" className="object-cover w-[50px] h-[50px] rounded-md" />}
      </div>
      <div className="text-sm flex items-start text-[#71717a]">{timestamp}</div>
    </div>
  );

  const renderSenderMessage = (message: Message, _timestamp: string) => (
    <div className="flex pr-4 items-center gap-2">
      <div className="flex bg-[#E11D48E5] p-3 rounded-xl text-white">{message.text}</div>
      <img src={data1.getConversation?.userTwo?.images[0]} alt="User Profile" className="rounded-full w-8 h-8" />
      <div className="flex w-[40px] h-[40px]">{message.images[0]}</div>
    </div>
  );

  return (
    <div className="flex flex-col overflow-hidden h-full w-full max-w-screen-lg mx-auto bg-white border rounded-lg">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => {
          const timestamp = formatTimestamp(message.timestamp);
          return (
            <div key={index} className={`flex w-full ${message.sender === sender ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className="font-medium text-base flex gap-2 flex-col max-w-[75%]">
                <div className="flex flex-col gap-2">{message.sender !== sender ? renderReceiverMessage(message, timestamp) : renderSenderMessage(message, timestamp)}</div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default GetChat;
