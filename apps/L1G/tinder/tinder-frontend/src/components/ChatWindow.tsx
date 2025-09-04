/* eslint-disable max-lines */
/* eslint-disable complexity */

import React from 'react';
import { MessageSquare, Send, MessageSquareDashedIcon, ArrowLeft, RefreshCw } from 'lucide-react';
import ChatHeader from './ChatHeader';
import type { ChatWindowProps } from 'types/chat';
import Loading from './Loading';
import { useChatScroll } from 'hooks/useChatScroll';
import { formatLastSeen, getStatusIndicator } from 'utils/chat-utils';
const ChatWindow: React.FC<ChatWindowProps> = ({
  matchId,
  lastSeenMessageId,
  selectedUser,
  messages,
  inputValue,
  onInputChange,
  onKeyDown,
  onSend,
  sending,
  onUnmatched,
  onBack,
  onRetryMessage,
  className,
  loading,
  typingUsers = {},
  userStatus,
}) => {
  const { bottomRef, messagesContainerRef, showScrollToBottom, scrollToBottom } = useChatScroll(messages.length);
  const handleRetryClick = (messageId: string | number) => {
    if (onRetryMessage) {
      onRetryMessage(messageId);
    }
  };
  const isUserTyping = selectedUser && typingUsers[selectedUser.id];
  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-50">
        <div className="text-center flex flex-col justify-center items-center">
          <MessageSquare size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">Select a match to start chatting</h3>
          <p className="text-gray-500">Choose someone from your matches to begin a conversation.</p>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-white">
        <Loading msg="Loading messages..." />
      </div>
    );
  }
  return (
    <div className={`w-full max-w-full md:w-[980px] h-full flex flex-col border-t border-r border-gray-200 rounded-r-xl bg-white ${className || ''}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-1 md:space-y-0 md:space-x-3">
          <div className="flex items-center space-x-2">
            {onBack && (
              <button onClick={onBack} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={20} />
              </button>
            )}
            {getStatusIndicator(userStatus)}
            {userStatus && <span className="text-sm text-gray-500 capitalize">{userStatus.status}</span>}
          </div>
          {userStatus?.lastSeen && userStatus.status === 'offline' && <span className="text-xs text-gray-400 ml-1">Last seen: {formatLastSeen(userStatus.lastSeen)}</span>}
        </div>
        <ChatHeader onUnmatched={onUnmatched} matchId={matchId} user={selectedUser} />
      </div>
      {/* Messages Container */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto bg-gray-50 relative">
        <div className="p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <MessageSquareDashedIcon size={48} className="text-gray-400 mb-4" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">Say Hi! 👋</h3>
              <p className="text-gray-500 text-base">You have got a match! Send a message to start chatting.</p>
            </div>
          ) : (
            <>
              {messages.map((msg) => {
                const isLastSeen = msg.id === lastSeenMessageId && msg.sender === 'me';
                return (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} relative group`}>
                    <div className="flex flex-col max-w-xs lg:max-w-md">
                      {/* Message Bubble */}
                      <div
                        className={`px-4 py-3 rounded-2xl relative ${
                          msg.sender === 'me'
                            ? msg.failed
                              ? 'bg-red-100 border border-red-300 text-red-800'
                              : 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                            : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                        }`}
                      >
                        <p className="text-sm break-words">{msg.text}</p>
                        {/* Message Status */}
                        <div className={`flex items-center justify-between mt-2 text-xs ${msg.sender === 'me' ? (msg.failed ? 'text-red-600' : 'text-pink-100') : 'text-gray-500'}`}>
                          <span>{msg.timestamp}</span>

                          {msg.sender === 'me' && (
                            <div className="flex items-center space-x-1 ml-2">
                              {msg.sending && <div data-testid="message-sending-spinner" className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />}
                              {msg.retrying && <RefreshCw className="w-3 h-3 animate-spin" />}
                              {msg.failed && !msg.retrying && (
                                <button onClick={() => handleRetryClick(msg.id)} className="text-xs underline hover:no-underline">
                                  retry
                                </button>
                              )}
                              {msg.delivered && !msg.sending && !msg.failed && <span className="text-xs">✓</span>}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Seen Avatar */}
                      {isLastSeen && (
                        <div className="flex justify-end mt-1">
                          <img src={selectedUser.images?.[0] || '/placeholder.svg'} alt="Seen" className="w-4 h-4 rounded-full border border-white" title="Seen" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* Typing Indicator */}
              {isUserTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 rounded-2xl px-4 py-3 max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={bottomRef} />
        </div>
        {/* Scroll to Bottom Button */}
        {showScrollToBottom && (
          <button onClick={scrollToBottom} className="absolute bottom-4 right-4 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
            <MessageSquare size={20} className="text-gray-600" />
          </button>
        )}
      </div>
      {/* Enhanced Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Say something nice..."
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            disabled={sending}
            className="flex-1 px-4 py-3 text-sm bg-gray-100 border-0 outline-none rounded-xl focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all disabled:opacity-50"
          />
          <button
            className={`flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all rounded-lg min-w-[80px] ${
              !inputValue.trim() || sending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transform hover:scale-105 active:scale-95'
            }`}
            onClick={onSend}
            disabled={!inputValue.trim() || sending}
            aria-label="Send"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
 