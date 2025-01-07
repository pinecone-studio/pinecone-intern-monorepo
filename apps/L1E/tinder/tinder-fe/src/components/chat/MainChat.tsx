import { useState, useRef } from 'react';
import { Match } from '@/generated';
import { MessageSquareDashed, Send } from 'lucide-react';

import { ProfileCarouselUser } from './ProfileCarousel';

type MatchesProps = {
  matches: Match[];
  username: string | null;
};

const ChatInterface: React.FC<MatchesProps> = ({ matches, username }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const currentMatch = matches?.find((match) => match?.targetUserId?.username === username);

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = () => {
    handleCloseModal();
  };

  const handleKeyDown = () => {
    handleCloseModal();
  };

  if (isModalOpen) {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
  } else {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleKeyDown);
  }

  return (
    <div className="flex flex-col h-full border-l-[1px] border-[#4e4e7] justify-between">
      <div className="flex max-w-[960px] justify-between items-center border-b-[1px] p-4 border-[#4e4e7] w-screen">
        <div className="flex gap-4">
          <img src={currentMatch?.targetUserId.images[0]} alt={`${currentMatch?.targetUserId.username}'s profile`} className="w-[50px] h-[50px] rounded-full object-cover border-2 border-gray-300" />
          <div className="flex flex-col">
            <div className="flex gap-2">
              <h2 className="text-lg font-semibold">{currentMatch?.targetUserId?.username},</h2>
              <div className="text-lg font-semibold">{currentMatch?.targetUserId.age}</div>
            </div>
            <div className="text-sm text-gray-500">{currentMatch?.targetUserId.profession}</div>
          </div>
        </div>
        <div className="flex w-[217px] gap-3 h-[40px]">
          <button
            data-testid="view" // Correct the spelling here
            className="w-[117px] py-2 border-[1px] rounded-[4px] border-gray-200"
            onClick={handleProfileClick}
          >
            View profile
          </button>
          <button className="w-[117px] py-2 px-4 border-[1px] rounded-[4px] border-gray-200">Unmatch</button>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center mt-4">
        <MessageSquareDashed />
        <div className="flex flex-col gap-1 items-center">
          <div className="text-sm">Say hi</div>
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
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80">
          <div ref={modalRef} role="dialog" aria-labelledby="modal-title" aria-hidden={!isModalOpen}>
            <ProfileCarouselUser matches={matches} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
