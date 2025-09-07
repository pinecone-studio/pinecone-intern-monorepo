import { useState, useCallback } from 'react';
import { X, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { MatchedUser } from '@/app/(main)/home/page';
import { imageVariantsLeft, imageVariantsRight, popupVariants } from 'utils/popup';
import { ChatUser, Message } from 'types/chat';
import { useSendMessageMutation } from '@/generated';
import { socket } from 'utils/socket';

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

  if (!matchedUsers || matchedUsers.length < 2) return null;

  const [user1, user2] = matchedUsers;

  const selectedUser: ChatUser | null = user2
    ? {
        id: user2.id,
        name: user2.name,
        images: user2.images,
        dateOfBirth: '',
        profession: '',
        age: 0,
        startedConversation: false,
      }
    : null;

  const generateTimestamp = useCallback(
    (): string =>
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    []
  );
  console.log('All matchIds:', data.getMe.matchIds);

  const handleSendMessage = async () => {
    console.log('handleSendMessage called');
    console.log('sending:', sending);
    console.log('inputValue:', inputValue);
    console.log('selectedUser:', selectedUser);
    console.log('data?.getMe?.id:', data?.getMe?.id);
    const content = inputValue.trim();
    if (sending || !content || !selectedUser || !data?.getMe?.id) return;

    setSending(true);
    setSocketError(null);

    const matchId = selectedUser.id;
    const senderId = data.getMe.id;

    const matchData = data.getMe.matchIds?.find((m: any) => m?.id === matchId);
    console.log(data.getMe, 'get');

    const receiverId = matchData?.matchedUser?.id;

    if (!receiverId) {
      console.error('Receiver ID not found for match:', matchId);
      setSending(false);
      setSocketError('Recipient not found. Please try again.');
      return;
    }

    console.log('Sending message from MatchPopup:', { matchId, senderId, receiverId, content });

    const tempId = `temp_${Date.now()}_${Math.random()}`;
    const timestamp = generateTimestamp();

    // Create optimistic message
    const optimisticMessage: Message = {
      id: tempId,
      text: content,
      sender: 'me',
      timestamp,
      seen: false,
      delivered: false,
      sending: true,
      failed: false,
      retrying: false,
    };

    // Add to conversations if setConversations is available (when called from chat page)
    if (setConversations) {
      setConversations((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), optimisticMessage],
      }));
    }

    // Add to chatted users if available
    if (setChattedUsers) {
      setChattedUsers((prev) => new Set(prev).add(selectedUser.id));
    }

    try {
      // Send to backend first
      console.log('Sending to backend...');
      const result = await sendMessageMutation({
        variables: { senderId, receiverId, matchId, content },
      });

      const createdMessageId = result.data?.sendMessage?.id;
      console.log('Backend response:', { createdMessageId });

      if (createdMessageId) {
        // Update optimistic message with real data
        if (setConversations) {
          setConversations((prev) => ({
            ...prev,
            [selectedUser.id]:
              prev[selectedUser.id]?.map((msg) =>
                msg.id === tempId
                  ? {
                      ...msg,
                      id: createdMessageId,
                      sending: false,
                      delivered: true,
                      failed: false,
                    }
                  : msg
              ) || [],
          }));
        }

        // Ensure socket is connected before emitting
        if (!socket.connected) {
          console.warn('Socket not connected, attempting to reconnect...');
          socket.connect();
        }

        // Emit socket message with real ID
        console.log('Emitting socket message...');
        socket.emit('chat_message', {
          matchId,
          content,
          senderId,
          receiverId,
          messageId: createdMessageId,
          tempId,
          timestamp: new Date().toISOString(),
        });

        // Store message in localStorage for cross-page persistence
        // This ensures the message appears when user navigates to chat page
        const storageKey = `pending_message_${matchId}`;
        const pendingMessage = {
          id: createdMessageId,
          text: content,
          sender: 'me',
          timestamp,
          seen: false,
          delivered: true,
          sending: false,
          failed: false,
          retrying: false,
        };

        try {
          localStorage.setItem(storageKey, JSON.stringify(pendingMessage));
          console.log('Message stored in localStorage for cross-page persistence');
        } catch (e) {
          console.warn('Could not store message in localStorage:', e);
        }

        // Clear input
        setInputValue('');

        console.log('Message sent successfully from MatchPopup');

        // Close popup after short delay
        setTimeout(() => onClose(), 1000);

        // Refetch data to update any counters or UI state
        if (refetch) {
          refetch();
        }
      } else {
        throw new Error('No message ID returned from backend');
      }
    } catch (error) {
      console.error('Send message failed from MatchPopup:', error);

      // Mark message as failed if we have setConversations
      if (setConversations) {
        setConversations((prev) => ({
          ...prev,
          [selectedUser.id]:
            prev[selectedUser.id]?.map((msg) =>
              msg.id === tempId
                ? {
                    ...msg,
                    sending: false,
                    failed: true,
                    delivered: false,
                  }
                : msg
            ) || [],
        }));
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSocketError(`Failed to send message: ${errorMessage}`);
    } finally {
      setSending(false);
    }
  };

  const handleInputChangeLocal = (value: string) => {
    setInputValue(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
            {/* Error display */}
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
                onChange={(e) => handleInputChangeLocal(e.target.value)}
                onKeyPress={handleKeyPress}
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
                handleSendMessage();
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
