/* eslint-disable react/function-component-definition */
/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable no-secrets/no-secrets */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useCallback } from 'react';
import { X, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { MatchedUser } from '@/app/(main)/home/page';
import { imageVariantsLeft, imageVariantsRight, popupVariants } from 'utils/popup';
import { ChatUser, Message } from 'types/chat';
import { useSendMessageMutation } from '@/generated';
import { socket } from 'utils/socket';
import { useCurrentUser } from '@/app/contexts/CurrentUserContext';
import {
  createOptimisticMessage,
  generateTimestamp,
  handleInputChangeLocal,
  handleKeyPress,
  markMessageAsFailed,
  storeMessageInLocalStorage,
  updateChattedUsers,
  updateConversationsWithMessage,
  updateMessageStatus,
  handleSendMessage,
} from 'utils/match-popup';

type MatchPopupProps = {
  onClose: () => void;
  matchedUsers: MatchedUser[];
  data?: any;
  setConversations?: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  setChattedUsers?: React.Dispatch<React.SetStateAction<Set<string>>>;
  refetch?: () => void;
};

const MatchPopup = ({ onClose, matchedUsers, data, setConversations, setChattedUsers, refetch }: MatchPopupProps) => {
  const [inputValue, setInputValue] = useState('');
  const [socketError, setSocketError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sendMessageMutation] = useSendMessageMutation();
  const { currentUser } = useCurrentUser();

  if (!matchedUsers || matchedUsers.length < 2) return null;

  const [user1, user2] = matchedUsers;
  const selectedUser: ChatUser = user2 && {
    id: user2.id,
    name: user2.name,
    images: user2.images,
    dateOfBirth: '',
    profession: '',
    age: 0,
    startedConversation: false,
    bio: '',
  };

  const handleSendMessageCallback = useCallback(async () => {
    await handleSendMessage({
      inputValue,
      sending,
      setSending,
      socketError,
      setSocketError,
      sendMessageMutation,
      currentUser,
      selectedUser,
      data,
      setConversations,
      setChattedUsers,
      onClose,
      refetch,
      setInputValue,
      socket,
      createOptimisticMessage,
      generateTimestamp,
      updateConversationsWithMessage,
      updateChattedUsers,
      updateMessageStatus,
      markMessageAsFailed,
      storeMessageInLocalStorage,
    });
  }, [
    inputValue,
    sending,
    setSending,
    socketError,
    setSocketError,
    sendMessageMutation,
    currentUser,
    selectedUser,
    data,
    setConversations,
    setChattedUsers,
    onClose,
    refetch,
    setInputValue,
    socket,
    createOptimisticMessage,
    generateTimestamp,
    updateConversationsWithMessage,
    updateChattedUsers,
    updateMessageStatus,
    markMessageAsFailed,
    storeMessageInLocalStorage,
  ]);

  const handleInputChange = handleInputChangeLocal(setInputValue);
  const handleKeyPressCallback = handleKeyPress(handleSendMessageCallback);

  return (
    <motion.div variants={popupVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-3xl max-w-sm w-full mx-auto shadow-2xl border border-[#E4E4E7]">
      <div className="flex justify-between items-center p-6">
        <p className="text-[16px] font-semibold gap-2 text-start text-[#09090B]">{`It's a Match`}</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} aria-label="Close icon" role="img" />
        </button>
      </div>
      <div className="w-full flex flex-col justify-start items-center px-6 pb-6">
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="flex justify-center items-center">
            <motion.div variants={imageVariantsLeft} initial="hidden" animate="visible">
              <div className="w-[152px] h-[152px] relative left-[20px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={user1?.images?.[0]} alt="Your profile" className="w-full h-full object-cover" aria-label="zurag1" role="img" />
              </div>
            </motion.div>
            <motion.div variants={imageVariantsRight} initial="hidden" animate="visible">
              <div className="w-[152px] h-[152px] relative right-[20px] rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={user2?.images?.[0]} alt={`${user2?.name}'s profile`} className="w-full h-full object-cover" aria-label="zurag2" role="img" />
              </div>
            </motion.div>
          </div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-[#09090B] text-[14px] font-normal font-sans">
            You matched with {user2?.name}
          </motion.p>
          <div className="w-full flex flex-col gap-4">
            {socketError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm text-center">
                {socketError}
              </motion.div>
            )}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex justify-center items-center">
              <Input
                type="text"
                placeholder="Say something nice"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPressCallback}
                disabled={sending}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-700 placeholder-gray-400 disabled:opacity-50"
              />
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={() => {
                console.log('Send button clicked');
                handleSendMessageCallback();
              }}
              disabled={sending || !inputValue.trim()}
              className="gap-2 w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-full font-semibold text-lg flex items-center justify-center hover:from-pink-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {sending ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Send size={20} />}
              <p data-testid="Send" className="text-[14px] font-sans font-medium">
                {sending ? 'Sending...' : 'Send'}
              </p>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchPopup;
