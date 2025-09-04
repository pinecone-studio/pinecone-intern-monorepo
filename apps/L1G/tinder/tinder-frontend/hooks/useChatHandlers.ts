/* eslint-disable no-unused-vars */
import { useCallback } from 'react';
 
type UseChatHandlersParams = {
  sending: boolean;
  inputValue: string;
  handleSend: (input: string, resetInput: (value: string) => void) => void;
  setInputValue: (value: string) => void;
  retryFailedMessage: (messageId: string | number) => void;
};
 
export function useChatHandlers({ sending, inputValue, handleSend, setInputValue, retryFailedMessage }: UseChatHandlersParams) {
  const handleSendClick = useCallback(() => {
    if (!sending && inputValue.trim()) {
      handleSend(inputValue, setInputValue);
    }
  }, [handleSend, inputValue, sending, setInputValue]);
 
  const handleRetryMessage = useCallback(
    (messageId: string | number) => {
      retryFailedMessage(messageId);
    },
    [retryFailedMessage]
  );
 
  return { handleSendClick, handleRetryMessage };
}