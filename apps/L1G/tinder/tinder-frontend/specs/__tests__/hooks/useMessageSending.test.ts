import { renderHook } from '@testing-library/react';
import { useSendMessageMutation } from '@/generated';
import { useMessageSending } from 'hooks/useMessageSending';

jest.mock('@/generated');
jest.mock('utils/socket', () => ({
  socket: {
    emit: jest.fn(),
  },
}));

describe('useMessageSending', () => {
  const mockSendMessage = jest.fn();
  const mockProps = {
    selectedUser: {
      id: '1',
      name: 'Test User',
      images: [],
      dateOfBirth: '',
      profession: '',
      age: 25,
      startedConversation: false,
    },
    data: {
      getMe: {
        id: 'me123',
        matchIds: [
          {
            id: '1',
            matchedUser: { id: 'user1' },
          },
        ],
      },
    },
    setConversations: jest.fn(),
    setChattedUsers: jest.fn(),
    moveUserToBottom: jest.fn(),
    setSocketError: jest.fn(),
    refetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSendMessageMutation as jest.Mock).mockReturnValue([mockSendMessage]);
    mockSendMessage.mockResolvedValue({
      data: { sendMessage: { id: 'msg123' } },
    });
  });

  test('handles sending message successfully', async () => {
    const { result } = renderHook(() => useMessageSending(mockProps));

    const setInputValue = jest.fn();
    await result.current.handleSend('Hello', setInputValue);

    expect(mockSendMessage).toHaveBeenCalled();
    expect(setInputValue).toHaveBeenCalledWith('');
    expect(mockProps.setConversations).toHaveBeenCalled();
  });

  test('does not send empty messages', async () => {
    const { result } = renderHook(() => useMessageSending(mockProps));

    const setInputValue = jest.fn();
    await result.current.handleSend('   ', setInputValue);

    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});
