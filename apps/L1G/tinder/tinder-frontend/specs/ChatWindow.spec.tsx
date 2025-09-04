/* eslint-disable max-lines */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatWindow from '../src/components/ChatWindow';

// Create the mock functions
const mockScrollToBottom = jest.fn();
const mockUseChatScrollImplementation = jest.fn(() => ({
  bottomRef: { current: null },
  messagesContainerRef: { current: null },
  showScrollToBottom: false,
  scrollToBottom: mockScrollToBottom,
}));

// Mock the useChatScroll hook
jest.mock('../hooks/useChatScroll', () => ({
  useChatScroll: jest.fn(),
}));

// Import the mocked module
import { useChatScroll } from '../hooks/useChatScroll';

// Mock the child components
jest.mock('../src/components/ChatHeader', () => {
  return function MockChatHeader({ onUnmatched, matchId, user }) {
    return (
      <div data-testid="chat-header">
        <span>Chat Header - {user?.name}</span>
        {onUnmatched && (
          <button onClick={onUnmatched} data-testid="unmatch-button">
            Unmatch
          </button>
        )}
      </div>
    );
  };
});

jest.mock('../src/components/Loading', () => {
  return function MockLoading({ msg }) {
    return <div data-testid="loading">{msg}</div>;
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  MessageSquare: ({ size, className }) => (
    <div data-testid="message-square" className={className}>
      {size}
    </div>
  ),
  Send: ({ size }) => <div data-testid="send-icon">{size}</div>,
  MessageSquareDashedIcon: ({ size, className }) => (
    <div data-testid="message-square-dashed" className={className}>
      {size}
    </div>
  ),
  ArrowLeft: ({ size }) => <div data-testid="arrow-left">{size}</div>,
  RefreshCw: ({ className }) => <div data-testid="refresh-icon" className={className}></div>,
  Wifi: ({ className }) => <div data-testid="wifi-icon" className={className}></div>,
  WifiOff: ({ className }) => <div data-testid="wifi-off-icon" className={className}></div>,
  Clock: ({ className }) => <div data-testid="clock-icon" className={className}></div>,
}));

const mockUser = {
  id: '1',
  name: 'John Doe',
  images: ['https://example.com/image1.jpg'],
};

const mockMessages = [
  {
    id: '1',
    text: 'Hello there!',
    sender: 'them',
    timestamp: '10:30 AM',
    seen: false,
    delivered: true,
  },
  {
    id: '2',
    text: 'Hi! How are you?',
    sender: 'me',
    timestamp: '10:31 AM',
    seen: true,
    delivered: true,
  },
  {
    id: '3',
    text: 'I am doing great, thanks!',
    sender: 'them',
    timestamp: '10:32 AM',
    seen: false,
    delivered: true,
  },
];

const defaultProps = {
  selectedUser: mockUser,
  messages: mockMessages,
  inputValue: '',
  onInputChange: jest.fn(),
  onKeyDown: jest.fn(),
  onSend: jest.fn(),
  sending: false,
  lastSeenMessageId: '2',
  matchId: 'match123',
  onUnmatched: jest.fn(),
  onBack: jest.fn(),
  onRetryMessage: jest.fn(),
  className: '',
  loading: false,
  typingUsers: {},
  userStatus: {
    status: 'online',
    lastSeen: '2024-01-15T10:30:00Z',
  },
};

describe('ChatWindow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up the mock implementation for useChatScroll
    (useChatScroll as jest.Mock).mockImplementation(mockUseChatScrollImplementation);
  });

  // Test that the hook is called with the correct parameter
  it('should call useChatScroll with messages length', () => {
    render(<ChatWindow {...defaultProps} />);
    expect(useChatScroll).toHaveBeenCalledWith(mockMessages.length);
  });

  // Test scroll to bottom button functionality
  it('should show scroll to bottom button when hook returns showScrollToBottom: true', () => {
    // Update the mock to return showScrollToBottom: true
    mockUseChatScrollImplementation.mockReturnValueOnce({
      bottomRef: { current: null },
      messagesContainerRef: { current: null },
      showScrollToBottom: true,
      scrollToBottom: mockScrollToBottom,
    });

    render(<ChatWindow {...defaultProps} />);

    // Find the button with MessageSquare icon (scroll to bottom button)
    const scrollButton = screen.getByTestId('message-square').closest('button');
    expect(scrollButton).toBeInTheDocument();
    fireEvent.click(scrollButton);
    expect(mockScrollToBottom).toHaveBeenCalled();
  });

  it('should not show scroll to bottom button when hook returns showScrollToBottom: false', () => {
    render(<ChatWindow {...defaultProps} />);

    // The scroll button should not exist when showScrollToBottom is false
    // Let's check that there's no button with a MessageSquare icon
    const messageSquareButtons = screen.queryAllByTestId('message-square').filter((icon) => icon.closest('button'));
    expect(messageSquareButtons).toHaveLength(0);
  });

  // Test hook behavior when messages length changes
  it('should call hook with updated messages length when messages change', () => {
    const { rerender } = render(<ChatWindow {...defaultProps} />);
    expect(useChatScroll).toHaveBeenCalledWith(3); // Initial 3 messages

    const newMessages = [
      ...mockMessages,
      {
        id: '4',
        text: 'New message',
        sender: 'them',
        timestamp: '10:33 AM',
      },
    ];

    rerender(<ChatWindow {...defaultProps} messages={newMessages} />);
    expect(useChatScroll).toHaveBeenCalledWith(4); // Updated to 4 messages
  });

  // Test hook behavior when messages length changes
  it('should call hook with updated messages length when messages change', () => {
    const { rerender } = render(<ChatWindow {...defaultProps} />);
    expect(useChatScroll).toHaveBeenCalledWith(3); // Initial 3 messages

    const newMessages = [
      ...mockMessages,
      {
        id: '4',
        text: 'New message',
        sender: 'them',
        timestamp: '10:33 AM',
      },
    ];

    rerender(<ChatWindow {...defaultProps} messages={newMessages} />);
    expect(useChatScroll).toHaveBeenCalledWith(4); // Updated to 4 messages
  });

  // Test with empty messages
  it('should call hook with 0 when no messages', () => {
    render(<ChatWindow {...defaultProps} messages={[]} />);
    expect(useChatScroll).toHaveBeenCalledWith(0);
  });
  describe('No User Selected', () => {
    it('should render empty state when no user is selected', () => {
      render(<ChatWindow {...defaultProps} selectedUser={null} />);

      expect(screen.getByText('Select a match to start chatting')).toBeInTheDocument();
      expect(screen.getByText('Choose someone from your matches to begin a conversation.')).toBeInTheDocument();
      expect(screen.getByTestId('message-square')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should render loading state when loading is true', () => {
      render(<ChatWindow {...defaultProps} loading={true} />);

      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.getByText('Loading messages...')).toBeInTheDocument();
    });
  });

  describe('Normal Chat State', () => {
    it('should render chat header with user information', () => {
      render(<ChatWindow {...defaultProps} />);

      expect(screen.getByTestId('chat-header')).toBeInTheDocument();
      expect(screen.getByText('Chat Header - John Doe')).toBeInTheDocument();
    });

    it('should render messages correctly', () => {
      render(<ChatWindow {...defaultProps} />);

      expect(screen.getByText('Hello there!')).toBeInTheDocument();
      expect(screen.getByText('Hi! How are you?')).toBeInTheDocument();
      expect(screen.getByText('I am doing great, thanks!')).toBeInTheDocument();
    });

    it('should show empty chat state when no messages', () => {
      render(<ChatWindow {...defaultProps} messages={[]} />);

      expect(screen.getByText('Say Hi! 👋')).toBeInTheDocument();
      expect(screen.getByText('You have got a match! Send a message to start chatting.')).toBeInTheDocument();
      expect(screen.getByTestId('message-square-dashed')).toBeInTheDocument();
    });

    it('should render input field and send button', () => {
      render(<ChatWindow {...defaultProps} />);

      const input = screen.getByPlaceholderText('Say something nice...');
      const sendButton = screen.getByRole('button', { name: /send/i });

      expect(input).toBeInTheDocument();
      expect(sendButton).toBeInTheDocument();
    });

    it('should call onInputChange when typing in input', () => {
      render(<ChatWindow {...defaultProps} />);

      const input = screen.getByPlaceholderText('Say something nice...');
      fireEvent.change(input, { target: { value: 'Hello' } });

      expect(defaultProps.onInputChange).toHaveBeenCalled();
    });

    it('should call onSend when send button is clicked', () => {
      render(<ChatWindow {...defaultProps} inputValue="Hello" />);

      const sendButton = screen.getByRole('button', { name: /send/i });
      fireEvent.click(sendButton);

      expect(defaultProps.onSend).toHaveBeenCalled();
    });

    it('should disable send button when input is empty', () => {
      render(<ChatWindow {...defaultProps} inputValue="" />);

      const sendButton = screen.getByRole('button', { name: /send/i });
      expect(sendButton).toBeDisabled();
    });

    it('should disable send button when input contains only whitespace', () => {
      render(<ChatWindow {...defaultProps} inputValue="   " />);

      const sendButton = screen.getByRole('button', { name: /send/i });
      expect(sendButton).toBeDisabled();
    });

    it('should disable send button when sending', () => {
      render(<ChatWindow {...defaultProps} inputValue="Hello" sending={true} />);

      const sendButton = screen.getByRole('button', { name: /send/i });
      expect(sendButton).toBeDisabled();
    });

    it('should show loading spinner when sending', () => {
      render(<ChatWindow {...defaultProps} inputValue="Hello" sending={true} />);

      const sendButton = screen.getByRole('button', { name: /send/i });
      const spinner = sendButton.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should call onKeyDown when pressing keys in input', () => {
      render(<ChatWindow {...defaultProps} />);

      const input = screen.getByPlaceholderText('Say something nice...');
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(defaultProps.onKeyDown).toHaveBeenCalled();
    });
  });

  describe('Message Status and Indicators', () => {
    it('should show seen indicator for last seen message', () => {
      render(<ChatWindow {...defaultProps} />);

      const seenAvatar = screen.getByTitle('Seen');
      expect(seenAvatar).toBeInTheDocument();
      expect(seenAvatar).toHaveAttribute('src', mockUser.images[0]);
    });

    it('should show retry button for failed messages', () => {
      const failedMessages = [
        {
          id: '1',
          text: 'Failed message',
          sender: 'me',
          timestamp: '10:30 AM',
          failed: true,
        },
      ];

      render(<ChatWindow {...defaultProps} messages={failedMessages} />);

      const retryButton = screen.getByText('retry');
      expect(retryButton).toBeInTheDocument();

      fireEvent.click(retryButton);
      expect(defaultProps.onRetryMessage).toHaveBeenCalledWith('1');
    });

    it('should not show retry button for failed messages when retrying', () => {
      const failedRetryingMessages = [
        {
          id: '1',
          text: 'Failed retrying message',
          sender: 'me',
          timestamp: '10:30 AM',
          failed: true,
          retrying: true,
        },
      ];

      render(<ChatWindow {...defaultProps} messages={failedRetryingMessages} />);

      const retryButton = screen.queryByText('retry');
      expect(retryButton).not.toBeInTheDocument();
    });

    it('should show sending indicator for messages being sent', () => {
      const sendingMessages = [
        {
          id: '1',
          text: 'Sending message',
          sender: 'me',
          timestamp: '10:30 AM',
          sending: true,
        },
      ];

      render(<ChatWindow {...defaultProps} messages={sendingMessages} />);

      const spinner = screen.getByTestId('message-sending-spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('should show retrying indicator for messages being retried', () => {
      const retryingMessages = [
        {
          id: '1',
          text: 'Retrying message',
          sender: 'me',
          timestamp: '10:30 AM',
          retrying: true,
        },
      ];

      render(<ChatWindow {...defaultProps} messages={retryingMessages} />);

      expect(screen.getByTestId('refresh-icon')).toHaveClass('animate-spin');
    });

    it('should show delivered checkmark for delivered messages', () => {
      const deliveredMessages = [
        {
          id: '1',
          text: 'Delivered message',
          sender: 'me',
          timestamp: '10:30 AM',
          delivered: true,
        },
      ];

      render(<ChatWindow {...defaultProps} messages={deliveredMessages} />);

      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('should not show delivered checkmark for sending messages', () => {
      const sendingMessages = [
        {
          id: '1',
          text: 'Sending message',
          sender: 'me',
          timestamp: '10:30 AM',
          delivered: true,
          sending: true,
        },
      ];

      render(<ChatWindow {...defaultProps} messages={sendingMessages} />);

      expect(screen.queryByText('✓')).not.toBeInTheDocument();
    });

    it('should not show delivered checkmark for failed messages', () => {
      const failedMessages = [
        {
          id: '1',
          text: 'Failed message',
          sender: 'me',
          timestamp: '10:30 AM',
          delivered: true,
          failed: true,
        },
      ];

      render(<ChatWindow {...defaultProps} messages={failedMessages} />);

      expect(screen.queryByText('✓')).not.toBeInTheDocument();
    });
  });

  describe('User Status Indicators', () => {
    it('should show online status indicator', () => {
      render(<ChatWindow {...defaultProps} userStatus={{ status: 'online', lastSeen: '' }} />);

      expect(screen.getByTestId('wifi-icon')).toBeInTheDocument();
      expect(screen.getByText('online')).toBeInTheDocument();
    });

    it('should show away status indicator', () => {
      render(<ChatWindow {...defaultProps} userStatus={{ status: 'away', lastSeen: '' }} />);

      expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
      expect(screen.getByText('away')).toBeInTheDocument();
    });

    it('should show offline status indicator with last seen', () => {
      const lastSeen = new Date(Date.now() - 30 * 60 * 1000).toISOString(); // 30 minutes ago
      render(<ChatWindow {...defaultProps} userStatus={{ status: 'offline', lastSeen }} />);

      expect(screen.getByTestId('wifi-off-icon')).toBeInTheDocument();
      expect(screen.getByText('offline')).toBeInTheDocument();
      expect(screen.getByText(/Last seen:/)).toBeInTheDocument();
    });

    it('should not show last seen for non-offline status', () => {
      render(<ChatWindow {...defaultProps} userStatus={{ status: 'online', lastSeen: '2024-01-15T10:30:00Z' }} />);

      expect(screen.queryByText(/Last seen:/)).not.toBeInTheDocument();
    });

    it('should return null for unknown status', () => {
      render(<ChatWindow {...defaultProps} userStatus={{ status: 'unknown', lastSeen: '' }} />);

      expect(screen.queryByTestId('wifi-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('wifi-off-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('clock-icon')).not.toBeInTheDocument();
    });
  });

  describe('Typing Indicator', () => {
    it('should show typing indicator when user is typing', () => {
      render(<ChatWindow {...defaultProps} typingUsers={{ '1': true }} />);

      const typingDots = screen.getAllByRole('generic').filter((el) => el.classList.contains('animate-bounce'));
      expect(typingDots).toHaveLength(3);
    });

    it('should not show typing indicator when user is not typing', () => {
      render(<ChatWindow {...defaultProps} typingUsers={{ '1': false }} />);

      const typingDots = screen.queryAllByRole('generic').filter((el) => el.classList.contains('animate-bounce'));
      expect(typingDots).toHaveLength(0);
    });

    it('should not show typing indicator when no selected user', () => {
      render(<ChatWindow {...defaultProps} selectedUser={null} typingUsers={{ '1': true }} />);

      const typingDots = screen.queryAllByRole('generic').filter((el) => el.classList.contains('animate-bounce'));
      expect(typingDots).toHaveLength(0);
    });
  });

  describe('Navigation and Actions', () => {
    it('should render back button when onBack is provided', () => {
      render(<ChatWindow {...defaultProps} />);

      expect(screen.getByTestId('arrow-left')).toBeInTheDocument();
    });

    it('should not render back button when onBack is not provided', () => {
      render(<ChatWindow {...defaultProps} onBack={undefined} />);

      expect(screen.queryByTestId('arrow-left')).not.toBeInTheDocument();
    });

    it('should call onBack when back button is clicked', () => {
      render(<ChatWindow {...defaultProps} />);

      const backButton = screen.getByTestId('arrow-left').closest('button');
      fireEvent.click(backButton);

      expect(defaultProps.onBack).toHaveBeenCalled();
    });

    it('should call onUnmatched when unmatch button is clicked', () => {
      render(<ChatWindow {...defaultProps} />);

      const unmatchButton = screen.getByTestId('unmatch-button');
      fireEvent.click(unmatchButton);

      expect(defaultProps.onUnmatched).toHaveBeenCalled();
    });

    it('should handle retry when onRetryMessage is not provided', () => {
      const failedMessages = [
        {
          id: '1',
          text: 'Failed message',
          sender: 'me',
          timestamp: '10:30 AM',
          failed: true,
        },
      ];

      render(<ChatWindow {...defaultProps} messages={failedMessages} onRetryMessage={undefined} />);

      const retryButton = screen.getByText('retry');
      fireEvent.click(retryButton);

      // Should not throw an error even when onRetryMessage is undefined
    });
  });

  describe('Accessibility', () => {
    it('should have proper accessibility attributes', () => {
      render(<ChatWindow {...defaultProps} />);

      const input = screen.getByPlaceholderText('Say something nice...');
      expect(input).toHaveAttribute('type', 'text');

      const sendButton = screen.getByRole('button', { name: /send/i });
      expect(sendButton).toBeInTheDocument();
      expect(sendButton).toHaveAttribute('aria-label', 'Send');
    });

    it('should disable input when sending', () => {
      render(<ChatWindow {...defaultProps} sending={true} />);

      const input = screen.getByPlaceholderText('Say something nice...');
      expect(input).toBeDisabled();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing user images gracefully', () => {
      const userWithoutImages = { ...mockUser, images: [] };
      render(<ChatWindow {...defaultProps} selectedUser={userWithoutImages} />);

      // Should still render without errors
      expect(screen.getByText('Chat Header - John Doe')).toBeInTheDocument();
    });

    it('should handle undefined user images gracefully', () => {
      const userWithUndefinedImages = { ...mockUser, images: undefined };
      render(<ChatWindow {...defaultProps} selectedUser={userWithUndefinedImages} />);

      // Should still render without errors
      expect(screen.getByText('Chat Header - John Doe')).toBeInTheDocument();
    });

    it('should handle undefined user status', () => {
      render(<ChatWindow {...defaultProps} userStatus={undefined} />);

      // Should render without status indicators
      expect(screen.queryByTestId('wifi-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('wifi-off-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('clock-icon')).not.toBeInTheDocument();
    });

    it('should handle missing typingUsers prop', () => {
      render(<ChatWindow {...defaultProps} typingUsers={undefined} />);

      // Should not show typing indicator
      const typingDots = screen.queryAllByRole('generic').filter((el) => el.classList.contains('animate-bounce'));
      expect(typingDots).toHaveLength(0);
    });

    it('should use placeholder image when user image is not available', () => {
      const messagesWithLastSeen = [
        {
          id: '1',
          text: 'Test message',
          sender: 'me',
          timestamp: '10:30 AM',
        },
      ];

      const userWithoutImages = { ...mockUser, images: [] };

      render(<ChatWindow {...defaultProps} selectedUser={userWithoutImages} messages={messagesWithLastSeen} lastSeenMessageId="1" />);

      const seenAvatar = screen.getByTitle('Seen');
      expect(seenAvatar).toHaveAttribute('src', '/placeholder.svg');
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(<ChatWindow {...defaultProps} className="custom-class" />);

      const chatWindow = container.querySelector('.custom-class');
      expect(chatWindow).toBeInTheDocument();
    });

    it('should handle empty className', () => {
      render(<ChatWindow {...defaultProps} className="" />);

      // Should render without errors
      expect(screen.getByText('Chat Header - John Doe')).toBeInTheDocument();
    });
  });
});
