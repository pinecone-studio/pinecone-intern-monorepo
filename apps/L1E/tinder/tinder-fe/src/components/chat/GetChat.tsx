import { MessageSquareDashed } from 'lucide-react';
import { ReactElement, JSXElementConstructor, ReactNode, useRef, useEffect, useState } from 'react';

interface Message {
  timestamp: string;
  sender: string;
  images: string[];
  text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactNode | null | undefined;
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
  const [showImage, setShowImage] = useState(false);
  const [showImage1, setShowImage1] = useState(false);

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

  const renderReceiverMessage = (message: Message, timestamp: string) => {
    return (
      <div className="flex flex-col items-start bg-[#f4f4f5] px-4 py-2 font-medium rounded-md gap-2">
        <div className="flex items-center gap-8">
          {message.text}
          {message.images && message.images[0] && (
            <div className="relative">
              <img src={message.images[0]} alt="Message Image" className={`object-cover w-[150px] h-[150px] rounded-md transition-all ${showImage1 ? 'blur-0' : 'blur-md'}`} />
              {!showImage1 && (
                <button onClick={() => setShowImage1(true)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-md">
                  This content may contain nudity. Viewer discretion is advised. Tap to view.
                </button>
              )}
            </div>
          )}
        </div>
        <div className="text-sm flex items-start text-[#71717a]">{timestamp}</div>
      </div>
    );
  };

  const renderSenderMessage = (message: Message, timestamp: string) => {
    return (
      <div className="flex flex-col items-start bg-[#E11D48E5] text-white px-4 py-2 font-medium rounded-md gap-2">
        <div className="flex items-center gap-8">
          {message.images && message.images[0] && (
            <div className="relative">
              <img src={message.images[0]} alt="Message Image" className={`object-cover w-[150px] h-[150px] rounded-md transition-all ${showImage ? 'blur-0' : 'blur-md'}`} />
              {!showImage && (
                <button onClick={() => setShowImage(true)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-md">
                  This content may contain nudity. Viewer discretion is advised. Tap to view.
                </button>
              )}
            </div>
          )}
          {message.text}
        </div>
        <div className="text-sm flex items-start text-white">{timestamp}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col overflow-hidden md:h-full h-[50%] w-full max-w-screen-lg mx-auto bg-white border rounded-lg">
      <div className="flex-1 overflow-y-auto  p-4">
        {messages.map((message, index) => {
          const timestamp = formatTimestamp(message.timestamp);
          return (
            <div key={index} className={`flex w-[50%] h-fit md:h-fit md:w-full ${message.sender === sender ? 'justify-end' : 'justify-start'} mb-4`}>
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
