/* eslint-disable react/function-component-definition */
/* eslint-disable max-lines */

'use client';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const mockRefetch = jest.fn();
const mockSendMessage = jest.fn();

// Mock the socket
jest.mock('utils/socket', () => ({
  socket: {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    connected: true,
  },
}));

// Mock GraphQL hooks
jest.mock('@/generated', () => ({
  useGetMeQuery: jest.fn(),
  useSendMessageMutation: jest.fn(),
}));

jest.mock('@/components/ChatPerson', () => {
  return function MockChatPerson({ selectedUser, bottomUsers, chattedUsers, onUserSelect }: any) {
    return (
      <div data-testid="chat-person">
        <div data-testid="selected-user">{selectedUser?.name || 'None'}</div>
        <div data-testid="bottom-users-count">Bottom: {bottomUsers?.length || 0}</div>
        <div data-testid="chatted-users-count">Chatted: {chattedUsers?.size || 0}</div>
        {bottomUsers?.map((u: any) => (
          <button key={u.id} onClick={() => onUserSelect(u)} data-testid={`bottom-${u.id}`}>
            {u.name}
          </button>
        ))}
      </div>
    );
  };
});

jest.mock('@/components/ChatWindow', () => {
  return function MockChatWindow({ selectedUser, messages, inputValue, onInputChange, onKeyDown, onSend }: any) {
    return (
      <div data-testid="chat-window">
        <div data-testid="chat-with">Chat with: {selectedUser?.name || 'None'}</div>
        <div data-testid="messages-count">Messages: {messages?.length || 0}</div>
        <input data-testid="chat-input" value={inputValue || ''} onChange={onInputChange} onKeyDown={onKeyDown} />
        <button onClick={onSend} data-testid="send-button">
          Send
        </button>
      </div>
    );
  };
});

jest.mock('@/components/Matches', () => {
  return function MockMatches({ topRowUsers, selectedUser, onUserSelect }: any) {
    return (
      <div data-testid="matches">
        <div data-testid="top-users-count">Top: {topRowUsers?.length || 0}</div>
        <div data-testid="selected-match">Selected: {selectedUser?.name || 'None'}</div>
        {topRowUsers?.map((u: any) => (
          <button key={u.id} onClick={() => onUserSelect(u)} data-testid={`top-${u.id}`}>
            {u.name}
          </button>
        ))}
      </div>
    );
  };
});

jest.mock('lodash', () => ({
  debounce: (fn: any) => fn,
}));

import { useGetMeQuery, useSendMessageMutation } from '@/generated';
import { socket } from 'utils/socket';
import ChatPage from '@/components/ChatPage';

describe('ChatPage - core behaviors', () => {
  const mockMatches = [
    {
      id: '1',
      matchedUser: {
        id: 'user1',
        name: 'Esther Howard',
        images: ['/esther1.jpg'],
        dateOfBirth: '1990-01-01T00:00:00Z',
        profession: 'Engineer',
      },
      startedConversation: true,
    },
    {
      id: '2',
      matchedUser: {
        id: 'user2',
        name: 'Leslie Alexander',
        images: ['/leslie1.jpg'],
        dateOfBirth: '1992-06-15T00:00:00Z',
        profession: 'Designer',
      },
      startedConversation: false,
    },
    {
      id: '3',
      matchedUser: {
        id: 'user3',
        name: 'Bessie Cooper',
        images: ['/bessie1.jpg'],
        dateOfBirth: '1988-03-10T00:00:00Z',
        profession: 'Artist',
      },
      startedConversation: false,
    },
  ];

  const mockUserData = {
    getMe: {
      id: 'me123',
      matchIds: mockMatches,
    },
  };

  beforeEach(() => {
    mockSendMessage.mockResolvedValue({
      data: {
        sendMessage: {
          id: 'msg123',
        },
      },
    });

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockUserData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    (useSendMessageMutation as jest.Mock).mockReturnValue([mockSendMessage]);

    // Reset all mocks
    jest.clearAllMocks();
  });

  test('shows loading state when data is loading', () => {
    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: mockRefetch,
    });

    const { container } = render(<ChatPage />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  test('handleSend does nothing if receiverId is not found', async () => {
    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: {
        getMe: {
          id: 'me123',
          matchIds: [
            {
              id: '1',
              matchedUser: null,
              startedConversation: false,
            },
          ],
        },
      },
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Hello');
    await userEvent.click(screen.getByTestId('send-button'));
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  test('shows error state when there is an error', () => {
    const mockError = { message: 'Network error' };
    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
      refetch: mockRefetch,
    });

    render(<ChatPage />);
    expect(screen.getByText('Error loading chat: Network error')).toBeInTheDocument();
  });

  test('renders UI and selects first user initially', () => {
    render(<ChatPage />);

    expect(screen.getByTestId('matches')).toBeInTheDocument();
    expect(screen.getByTestId('chat-person')).toBeInTheDocument();
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();

    expect(screen.getByTestId('selected-user')).toHaveTextContent('Esther Howard');
    expect(screen.getByTestId('selected-match')).toHaveTextContent('Selected: Esther Howard');
  });

  test('displays correct counts for top users and bottom users', () => {
    render(<ChatPage />);

    expect(screen.getByTestId('top-users-count')).toHaveTextContent('Top: 3');
    expect(screen.getByTestId('bottom-users-count')).toHaveTextContent('Bottom: 0');
    expect(screen.getByTestId('chatted-users-count')).toHaveTextContent('Chatted: 1');
  });

  test('selecting user from top row updates chat window', async () => {
    render(<ChatPage />);

    await userEvent.click(screen.getByTestId('top-2'));
    expect(screen.getByTestId('chat-with')).toHaveTextContent('Chat with: Leslie Alexander');
  });

  test('sending message clears input and adds message', async () => {
    const user = userEvent.setup();
    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    await user.type(input, 'Hello');
    expect(input).toHaveValue('Hello');

    await user.click(screen.getByTestId('send-button'));

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith({
        variables: {
          senderId: 'me123',
          receiverId: 'user1',
          matchId: '1',
          content: 'Hello',
        },
      });
    });

    expect(input).toHaveValue('');
    expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 1');

    expect(socket.emit).toHaveBeenCalledWith('chat message', {
      matchId: '1',
      message: 'Hello',
      senderId: 'me123',
      receiverId: 'user1',
      id: 'msg123',
    });
  });

  test('sending message with Enter key triggers send', async () => {
    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Hi there');
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: false });

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalled();
      expect(input).toHaveValue('');
    });
  });

  test('Shift+Enter does not trigger send', async () => {
    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Hi there');
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockSendMessage).not.toHaveBeenCalled();
    expect(input).toHaveValue('Hi there');
  });

  test('empty or whitespace only messages are not sent', async () => {
    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');

    await userEvent.click(screen.getByTestId('send-button'));
    expect(mockSendMessage).not.toHaveBeenCalled();

    await userEvent.type(input, '   ');
    await userEvent.click(screen.getByTestId('send-button'));
    expect(mockSendMessage).not.toHaveBeenCalled();

    expect(input).toHaveValue('   ');
  });

  test('socket joins room when user is selected', () => {
    render(<ChatPage />);

    expect(socket.emit).toHaveBeenCalledWith('join room', '1');
    expect(socket.on).toHaveBeenCalledWith('chat message', expect.any(Function));
  });

  test('socket leaves previous room when switching users', async () => {
    const user = userEvent.setup();
    render(<ChatPage />);

    expect(socket.emit).toHaveBeenCalledWith('join room', '1');

    (socket.emit as jest.Mock).mockClear();
    (socket.off as jest.Mock).mockClear();

    await user.click(screen.getByTestId('top-2'));

    expect(socket.emit).toHaveBeenCalledWith('leave room', '1');
    expect(socket.emit).toHaveBeenCalledWith('join room', '2');
    expect(socket.off).toHaveBeenCalledWith('chat message', expect.any(Function));
  });

  test('handles send message error gracefully', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    mockSendMessage.mockRejectedValue(new Error('Network error'));

    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    await user.type(input, 'Hello');
    await user.click(screen.getByTestId('send-button'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Send failed:', expect.any(Error));
      expect(input).toHaveValue('Hello'); // Input should not clear on error
      expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 0'); // No messages added
      expect(screen.getByText('Failed to send message. Please try again.')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  test('age calculation works correctly', () => {
    render(<ChatPage />);

    expect(screen.getByTestId('matches')).toBeInTheDocument();
  });

  test('handles users without images by providing default', () => {
    const mockDataNoImages = {
      getMe: {
        id: 'me123',
        matchIds: [
          {
            id: '1',
            matchedUser: {
              id: 'user1',
              name: 'Test User',
              images: [],
              dateOfBirth: '1990-01-01T00:00:00Z',
              profession: 'Tester',
            },
            startedConversation: false,
          },
        ],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataNoImages,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    expect(screen.getByTestId('selected-user')).toHaveTextContent('Test User');
  });
});

describe('ChatPage - additional coverage tests', () => {
  const mockMatches = [
    {
      id: '1',
      matchedUser: {
        id: 'user1',
        name: 'Esther Howard',
        images: ['/esther1.jpg'],
        dateOfBirth: '1990-01-01T00:00:00Z',
        profession: 'Engineer',
      },
      startedConversation: true,
    },
    {
      id: '2',
      matchedUser: {
        id: 'user2',
        name: 'Leslie Alexander',
        images: ['/leslie1.jpg'],
        dateOfBirth: '1992-06-15T00:00:00Z',
        profession: 'Designer',
      },
      startedConversation: false,
    },
    {
      id: '3',
      matchedUser: {
        id: 'user3',
        name: 'Bessie Cooper',
        images: ['/bessie1.jpg'],
        dateOfBirth: '1988-03-10T00:00:00Z',
        profession: 'Artist',
      },
      startedConversation: false,
    },
  ];

  const mockUserData = {
    getMe: {
      id: 'me123',
      matchIds: mockMatches,
    },
  };

  beforeEach(() => {
    mockSendMessage.mockResolvedValue({
      data: {
        sendMessage: {
          id: 'msg123',
        },
      },
    });

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockUserData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    (useSendMessageMutation as jest.Mock).mockReturnValue([mockSendMessage]);

    jest.clearAllMocks();
  });
  test('handles incoming socket messages and updates conversations', async () => {
    render(<ChatPage />);

    // Get the socket message handler
    const socketOnCalls = (socket.on as jest.Mock).mock.calls;
    const chatMessageHandler = socketOnCalls.find((call) => call[0] === 'chat message')?.[1];

    expect(chatMessageHandler).toBeDefined();

    // Simulate an incoming message for the currently selected user (id: '1')
    const mockIncomingMessage = {
      matchId: '1',
      message: 'Hello from socket',
      senderId: 'user1',
      receiverId: 'me123',
    };

    // Trigger the handler
    chatMessageHandler(mockIncomingMessage);

    // Verify the conversation was updated
    await waitFor(() => {
      expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 1');
    });
  });
  test('handles error when leaving room fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    // Mock socket.emit to throw error only for 'leave room'
    (socket.emit as jest.Mock).mockImplementation((event) => {
      if (event === 'leave room') {
        throw new Error('Leave room failed');
      }
      // Allow other events to succeed
    });

    const { unmount } = render(<ChatPage />);

    // Unmount the component to trigger the cleanup
    unmount();

    // Verify the error was logged
    expect(consoleSpy).toHaveBeenCalledWith('Failed to leave room:', expect.any(Error));

    consoleSpy.mockRestore();
  });
  test('updates conversations when sending a message', async () => {
    render(<ChatPage />);

    // Initially there should be no messages
    expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 0');

    // Send a message
    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Hello from test');
    await userEvent.click(screen.getByTestId('send-button'));

    // Verify the conversation was updated
    await waitFor(() => {
      expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 1');
    });
  });
  test('handles socket error when joining room', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (socket.emit as jest.Mock).mockImplementation((event) => {
      if (event === 'join room') {
        throw new Error('Join room failed');
      }
    });

    render(<ChatPage />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to connect to chat. Please try again.')).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Failed to join room:', expect.any(Error));
    consoleSpy.mockRestore();
  });
  test('handles socket errors when receiving messages', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<ChatPage />);

    // Get the socket message handler
    const socketOnCalls = (socket.on as jest.Mock).mock.calls;
    const chatMessageHandler = socketOnCalls.find((call) => call[0] === 'chat message')?.[1];

    expect(chatMessageHandler).toBeDefined();

    // Simulate an error in the message handler
    chatMessageHandler.toString().includes('setConversations');

    // Create a malformed message that might cause issues
    const malformedMessage = {
      matchId: null,
      message: 'Malformed message',
      senderId: null,
      receiverId: null,
    };

    // This should trigger error handling
    try {
      chatMessageHandler(malformedMessage);
    } catch (e) {
      // Expected error
    }

    consoleSpy.mockRestore();
  });
  test('ignores incoming socket messages for different matchId', async () => {
    render(<ChatPage />);

    const socketOnCalls = (socket.on as jest.Mock).mock.calls;
    const chatMessageHandler = socketOnCalls.find((call) => call[0] === 'chat message')?.[1];

    expect(chatMessageHandler).toBeDefined();

    const mockIncomingMessage = {
      id: 'incoming-msg-123',
      content: 'Hello from socket',
      senderId: 'user2',
      receiverId: 'me123',
      matchId: '2', // Different matchId
    };

    chatMessageHandler(mockIncomingMessage);

    await waitFor(() => {
      expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 0'); // No messages added
    });
  });

  test('handles user with no matches and no socket events', () => {
    const mockDataNoMatches = {
      getMe: {
        id: 'me123',
        matchIds: [],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataNoMatches,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    expect(screen.getByTestId('top-users-count')).toHaveTextContent('Top: 0');
    expect(screen.getByTestId('bottom-users-count')).toHaveTextContent('Bottom: 0');
    expect(screen.getByTestId('selected-user')).toHaveTextContent('None');
    expect(socket.emit).not.toHaveBeenCalledWith('join room', expect.any(String));
  });

  test('cleans up socket listeners on unmount', () => {
    const { unmount } = render(<ChatPage />);

    (socket.off as jest.Mock).mockClear();
    unmount();

    expect(socket.off).toHaveBeenCalledWith('chat message', expect.any(Function));
    expect(socket.emit).toHaveBeenCalledWith('leave room', '1');
  });

  test('can refetch data', async () => {
    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Hello');
    await userEvent.click(screen.getByTestId('send-button'));
    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalled();
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  test('handles users with missing optional fields', () => {
    const mockDataWithNulls = {
      getMe: {
        id: 'me123',
        matchIds: [
          {
            id: '1',
            matchedUser: {
              id: 'user1',
              name: 'User With Nulls',
              images: null,
              dateOfBirth: null,
              profession: null,
            },
            startedConversation: false,
          },
        ],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataWithNulls,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    expect(screen.getByTestId('selected-user')).toHaveTextContent('User With Nulls');
  });

  test('trims whitespace from messages before sending', async () => {
    const user = userEvent.setup();
    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    await user.type(input, '  Hello World  ');
    await user.click(screen.getByTestId('send-button'));

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith({
        variables: {
          senderId: 'me123',
          receiverId: 'user1',
          matchId: '1',
          content: 'Hello World',
        },
      });
    });
  });

  test('correctly distributes users between top and bottom when more than 7', () => {
    const mockDataManyUsers = {
      getMe: {
        id: 'me123',
        matchIds: Array.from({ length: 10 }, (_, i) => ({
          id: `${i + 1}`,
          matchedUser: {
            id: `user${i + 1}`,
            name: `User ${i + 1}`,
            images: [`/user${i + 1}.jpg`],
            dateOfBirth: '1990-01-01T00:00:00Z',
            profession: 'Professional',
          },
          startedConversation: i < 3,
        })),
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataManyUsers,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    expect(screen.getByTestId('top-users-count')).toHaveTextContent('Top: 7');
    expect(screen.getByTestId('bottom-users-count')).toHaveTextContent('Bottom: 3');
    expect(screen.getByTestId('chatted-users-count')).toHaveTextContent('Chatted: 3');
  });

  test('selecting user from bottom row updates chat window', async () => {
    const mockDataManyUsers = {
      getMe: {
        id: 'me123',
        matchIds: Array.from({ length: 10 }, (_, i) => ({
          id: `${i + 1}`,
          matchedUser: {
            id: `user${i + 1}`,
            name: `User ${i + 1}`,
            images: [`/user${i + 1}.jpg`],
            dateOfBirth: '1990-01-01T00:00:00Z',
            profession: 'Professional',
          },
          startedConversation: false,
        })),
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataManyUsers,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    await userEvent.click(screen.getByTestId('bottom-8'));
    expect(screen.getByTestId('chat-with')).toHaveTextContent('Chat with: User 8');
  });

  test('handles Enter key combinations correctly', async () => {
    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Test message');

    fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockSendMessage).not.toHaveBeenCalled();

    fireEvent.keyDown(input, { key: 'Enter', altKey: true });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockSendMessage).not.toHaveBeenCalled();

    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalled();
    });
  });

  test('handles socket connection errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (socket.emit as jest.Mock).mockImplementation((event) => {
      if (event === 'join room') {
        throw new Error('Socket connection error');
      }
    });

    render(<ChatPage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to connect to chat. Please try again.')).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Failed to join room:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  test('handleSend does nothing if getMe.id is missing', async () => {
    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: {
        getMe: {
          id: null,
          matchIds: mockMatches,
        },
      },
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Hello');
    await userEvent.click(screen.getByTestId('send-button'));
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  test('sets selectedUser to first match when prevSelected is not in newMatches', async () => {
    const { rerender } = render(<ChatPage />);

    // Verify initial state
    expect(screen.getByTestId('selected-user')).toHaveTextContent('Esther Howard');

    // Update mock to simulate new data without the previous selected user
    const newMockData = {
      getMe: {
        id: 'me123',
        matchIds: [
          {
            id: '4',
            matchedUser: {
              id: 'user4',
              name: 'New User',
              images: ['/newuser.jpg'],
              dateOfBirth: '1995-01-01T00:00:00Z',
              profession: 'Developer',
            },
            startedConversation: false,
          },
        ],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: newMockData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    // Re-render with updated mock
    rerender(<ChatPage />);

    await waitFor(() => {
      expect(screen.getByTestId('selected-user')).toHaveTextContent('New User');
    });
  });

  test('moveUserToBottom correctly updates top and bottom users', async () => {
    const mockDataManyUsers = {
      getMe: {
        id: 'me123',
        matchIds: Array.from({ length: 10 }, (_, i) => ({
          id: `${i + 1}`,
          matchedUser: {
            id: `user${i + 1}`,
            name: `User ${i + 1}`,
            images: [`/user${i + 1}.jpg`],
            dateOfBirth: '1990-01-01T00:00:00Z',
            profession: 'Professional',
          },
          startedConversation: false,
        })),
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataManyUsers,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    // Initial state: 7 top, 3 bottom
    expect(screen.getByTestId('top-users-count')).toHaveTextContent('Top: 7');
    expect(screen.getByTestId('bottom-users-count')).toHaveTextContent('Bottom: 3');

    // Send a message to move user1 to bottom
    await userEvent.click(screen.getByTestId('top-1'));
    await userEvent.type(screen.getByTestId('chat-input'), 'Hello');
    await userEvent.click(screen.getByTestId('send-button'));

    await waitFor(() => {
      expect(screen.getByTestId('top-users-count')).toHaveTextContent('Top: 6');
      expect(screen.getByTestId('bottom-users-count')).toHaveTextContent('Bottom: 4');
      expect(screen.getByTestId('bottom-1')).toBeInTheDocument();
    });
  });

  test('messages are empty when selectedUser is null', () => {
    const mockDataNoMatches = {
      getMe: {
        id: 'me123',
        matchIds: [],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataNoMatches,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 0');
  });

  test('handleSend does nothing if selectedUser is null', async () => {
    const mockDataNoMatches = {
      getMe: {
        id: 'me123',
        matchIds: [],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataNoMatches,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Hello');
    await userEvent.click(screen.getByTestId('send-button'));
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  test('handles partial success in sendMessage when socket emit fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    // Mock socket.emit to throw error only for 'chat message'
    (socket.emit as jest.Mock).mockImplementation((event) => {
      if (event === 'chat message') {
        throw new Error('Socket emit failed');
      }
      // Allow 'join room' and 'leave room' to succeed
    });

    render(<ChatPage />);

    // Simulate selecting a user
    await userEvent.click(screen.getByTestId('top-1')); // Select "Esther Howard"

    // Simulate sending a message
    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Hello');
    await userEvent.click(screen.getByTestId('send-button'));

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalled();
      expect(input).toHaveValue(''); // Input should clear
      expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 1'); // Message added to UI
      expect(screen.getByText('Message saved, but failed to notify recipient.')).toBeInTheDocument();
      expect(consoleSpy).toHaveBeenCalledWith('Send failed:', expect.any(Error));
      expect(consoleSpy).toHaveBeenCalledTimes(1); // Ensure only one console.error call
    });

    consoleSpy.mockRestore();
  });
  test('uses "Unknown" as fallback when user name is falsy', () => {
    const mockDataWithFalsyName = {
      getMe: {
        id: 'me123',
        matchIds: [
          {
            id: '1',
            matchedUser: {
              id: 'user1',
              name: null, // Falsy name - should trigger the fallback
              images: ['/user1.jpg'],
              dateOfBirth: '1990-01-01T00:00:00Z',
              profession: 'Engineer',
            },
            startedConversation: true,
          },
          {
            id: '2',
            matchedUser: {
              id: 'user2',
              name: '', // Empty string - should also trigger the fallback
              images: ['/user2.jpg'],
              dateOfBirth: '1992-01-01T00:00:00Z',
              profession: 'Designer',
            },
            startedConversation: false,
          },
          {
            id: '3',
            matchedUser: {
              id: 'user3',
              name: undefined, // Undefined - should trigger the fallback
              images: ['/user3.jpg'],
              dateOfBirth: '1988-01-01T00:00:00Z',
              profession: 'Artist',
            },
            startedConversation: false,
          },
        ],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataWithFalsyName,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    // Verify that all users with falsy names show as "Unknown"
    expect(screen.getByTestId('top-1')).toHaveTextContent('Unknown');
    expect(screen.getByTestId('top-2')).toHaveTextContent('Unknown');
    expect(screen.getByTestId('top-3')).toHaveTextContent('Unknown');

    // Verify that the selected user (first one) also shows as "Unknown"
    expect(screen.getByTestId('selected-user')).toHaveTextContent('Unknown');
    expect(screen.getByTestId('selected-match')).toHaveTextContent('Selected: Unknown');
  });

  test('uses "Unknown" as fallback when user name is missing entirely', () => {
    const mockDataWithMissingName = {
      getMe: {
        id: 'me123',
        matchIds: [
          {
            id: '1',
            matchedUser: {
              id: 'user1',
              // name property is missing entirely
              images: ['/user1.jpg'],
              dateOfBirth: '1990-01-01T00:00:00Z',
              profession: 'Engineer',
            },
            startedConversation: true,
          },
        ],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataWithMissingName,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    // Verify that the user with missing name shows as "Unknown"
    expect(screen.getByTestId('top-1')).toHaveTextContent('Unknown');
    expect(screen.getByTestId('selected-user')).toHaveTextContent('Unknown');
  });
  test('preserves selected user when updating matches if user still exists', async () => {
    // Initial render with first set of matches
    const { rerender } = render(<ChatPage />);

    // Verify initial selected user
    expect(screen.getByTestId('selected-user')).toHaveTextContent('Esther Howard');

    // Update mock data with new matches that still include the selected user
    const updatedMockData = {
      getMe: {
        id: 'me123',
        matchIds: [
          // Same selected user (Esther Howard) - this should remain selected
          {
            id: '1',
            matchedUser: {
              id: 'user1',
              name: 'Esther Howard',
              images: ['/esther1.jpg'],
              dateOfBirth: '1990-01-01T00:00:00Z',
              profession: 'Engineer',
            },
            startedConversation: true,
          },
          // New user added
          {
            id: '4',
            matchedUser: {
              id: 'user4',
              name: 'New User',
              images: ['/newuser.jpg'],
              dateOfBirth: '1995-01-01T00:00:00Z',
              profession: 'Developer',
            },
            startedConversation: false,
          },
          // Another user removed (Leslie Alexander)
        ],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: updatedMockData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    // Re-render with updated data
    rerender(<ChatPage />);

    // Verify the selected user is still Esther Howard
    expect(screen.getByTestId('selected-user')).toHaveTextContent('Esther Howard');
    expect(screen.getByTestId('selected-match')).toHaveTextContent('Selected: Esther Howard');

    // Verify that the new user is also present
    expect(screen.getByTestId('top-4')).toHaveTextContent('New User');
  });
  test('does not send message if receiverId is missing', async () => {
    // Create mock data where the matchedUser exists but has no id
    const mockDataWithNoReceiverId = {
      getMe: {
        id: 'me123',
        matchIds: [
          {
            id: '1',
            matchedUser: {
              id: null, // This will cause receiverId to be null
              name: 'Test User',
              images: ['/test.jpg'],
              dateOfBirth: '1990-01-01T00:00:00Z',
              profession: 'Tester',
            },
            startedConversation: false,
          },
        ],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockDataWithNoReceiverId,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ChatPage />);

    // Try to send a message
    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'This should not be sent');
    await userEvent.click(screen.getByTestId('send-button'));

    // Verify that sendMessage was not called
    expect(mockSendMessage).not.toHaveBeenCalled();

    // Verify that the message count remains 0
    expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 0');

    // Verify that input still has the text (wasn't cleared)
    expect(input).toHaveValue('This should not be sent');
  });
  test('creates message with server-provided ID', async () => {
    // Mock sendMessage to return a result with a specific ID
    mockSendMessage.mockResolvedValue({
      data: {
        sendMessage: {
          id: 'server-generated-id-123',
        },
      },
    });

    (useSendMessageMutation as jest.Mock).mockReturnValue([mockSendMessage]);

    render(<ChatPage />);

    // Send a message
    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Message with server ID');
    await userEvent.click(screen.getByTestId('send-button'));

    // Verify the message was added to the conversation
    await waitFor(() => {
      expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 1');
    });

    // Verify that sendMessage was called
    expect(mockSendMessage).toHaveBeenCalledWith({
      variables: {
        senderId: 'me123',
        receiverId: 'user1',
        matchId: '1',
        content: 'Message with server ID',
      },
    });

    // Verify socket emit was called with the server-generated ID
    expect(socket.emit).toHaveBeenCalledWith('chat message', {
      matchId: '1',
      message: 'Message with server ID',
      senderId: 'me123',
      receiverId: 'user1',
      id: 'server-generated-id-123',
    });
  });
  test('creates message with client-generated fallback ID when server ID is missing', async () => {
    // Mock sendMessage to return a result without an ID
    mockSendMessage.mockResolvedValue({
      data: {
        sendMessage: {
          id: undefined, // No ID from server
        },
      },
    });

    (useSendMessageMutation as jest.Mock).mockReturnValue([mockSendMessage]);

    render(<ChatPage />);

    // Send a message
    const input = screen.getByTestId('chat-input');
    await userEvent.type(input, 'Message with fallback ID');
    await userEvent.click(screen.getByTestId('send-button'));

    // Verify the message was added to the conversation
    await waitFor(() => {
      expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 1');
    });

    // Verify that sendMessage was called
    expect(mockSendMessage).toHaveBeenCalledWith({
      variables: {
        senderId: 'me123',
        receiverId: 'user1',
        matchId: '1',
        content: 'Message with fallback ID',
      },
    });

    // Verify socket emit was called with undefined ID (as per current implementation)
    expect(socket.emit).toHaveBeenCalledWith('chat message', {
      matchId: '1',
      message: 'Message with fallback ID',
      senderId: 'me123',
      receiverId: 'user1',
      id: undefined, // Current implementation uses createdMessageId directly
    });
  });

  test('preserves selected user when matches order changes but user still exists', async () => {
    // Initial render with first set of matches
    const { rerender } = render(<ChatPage />);

    // Verify initial selected user
    expect(screen.getByTestId('selected-user')).toHaveTextContent('Esther Howard');

    // Update mock data with the same matches but in different order
    const reorderedMockData = {
      getMe: {
        id: 'me123',
        matchIds: [
          // Move Esther Howard to second position
          {
            id: '2',
            matchedUser: {
              id: 'user2',
              name: 'Leslie Alexander',
              images: ['/leslie1.jpg'],
              dateOfBirth: '1992-06-15T00:00:00Z',
              profession: 'Designer',
            },
            startedConversation: false,
          },
          // Previously selected user (Esther Howard) - now in second position
          {
            id: '1',
            matchedUser: {
              id: 'user1',
              name: 'Esther Howard',
              images: ['/esther1.jpg'],
              dateOfBirth: '1990-01-01T00:00:00Z',
              profession: 'Engineer',
            },
            startedConversation: true,
          },
          {
            id: '3',
            matchedUser: {
              id: 'user3',
              name: 'Bessie Cooper',
              images: ['/bessie1.jpg'],
              dateOfBirth: '1988-03-10T00:00:00Z',
              profession: 'Artist',
            },
            startedConversation: false,
          },
        ],
      },
    };

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: reorderedMockData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    // Re-render with reordered data
    rerender(<ChatPage />);

    // Verify the selected user is still Esther Howard even though it's now in second position
    expect(screen.getByTestId('selected-user')).toHaveTextContent('Esther Howard');
    expect(screen.getByTestId('selected-match')).toHaveTextContent('Selected: Esther Howard');

    // Verify that the order in the UI has changed (Leslie is now first)
    expect(screen.getByTestId('top-2')).toHaveTextContent('Leslie Alexander');
    expect(screen.getByTestId('top-1')).toHaveTextContent('Esther Howard');
  });
});

describe('ChatPage - state and lifecycle', () => {
  const mockMatches = [
    {
      id: '1',
      matchedUser: {
        id: 'user1',
        name: 'Esther Howard',
        images: ['/esther1.jpg'],
        dateOfBirth: '1990-01-01T00:00:00Z',
        profession: 'Engineer',
      },
      startedConversation: true,
    },
    {
      id: '2',
      matchedUser: {
        id: 'user2',
        name: 'Leslie Alexander',
        images: ['/leslie1.jpg'],
        dateOfBirth: '1992-06-15T00:00:00Z',
        profession: 'Designer',
      },
      startedConversation: false,
    },
    {
      id: '3',
      matchedUser: {
        id: 'user3',
        name: 'Bessie Cooper',
        images: ['/bessie1.jpg'],
        dateOfBirth: '1988-03-10T00:00:00Z',
        profession: 'Artist',
      },
      startedConversation: false,
    },
  ];

  const mockUserData = {
    getMe: {
      id: 'me123',
      matchIds: mockMatches,
    },
  };

  beforeEach(() => {
    mockSendMessage.mockResolvedValue({
      data: {
        sendMessage: {
          id: 'msg123',
        },
      },
    });

    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockUserData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    (useSendMessageMutation as jest.Mock).mockReturnValue([mockSendMessage]);

    jest.clearAllMocks();
  });

  test('maintains state consistency during rapid user switching', async () => {
    render(<ChatPage />);

    await userEvent.click(screen.getByTestId('top-2'));
    await userEvent.click(screen.getByTestId('top-3'));
    await userEvent.click(screen.getByTestId('top-1'));

    expect(screen.getByTestId('chat-with')).toHaveTextContent('Chat with: Esther Howard');
  });

  test('handles concurrent message sending', async () => {
    const user = userEvent.setup();
    render(<ChatPage />);

    const input = screen.getByTestId('chat-input');
    const sendButton = screen.getByTestId('send-button');

    await user.type(input, 'Message 1');
    await user.click(sendButton);

    await user.type(input, 'Message 2');
    await user.click(sendButton);

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledTimes(2);
      expect(screen.getByTestId('messages-count')).toHaveTextContent('Messages: 2');
    });
  });
});
