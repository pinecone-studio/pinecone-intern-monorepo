/* eslint-disable max-lines */
/* eslint-disable react/function-component-definition */
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatWindow from '@/components/ChatWindow';
import { ChatUser } from 'types/chat';

// Mock the child components and icons
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('lucide-react', () => ({
  MessageSquare: () => <div data-testid="message-square-icon" />,
  Send: () => <div data-testid="send-icon" />,
  MessageSquareDashedIcon: () => <div data-testid="message-dashed-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  RefreshCw: () => <div data-testid="refresh-cw-icon" />,
  Wifi: () => <div data-testid="wifi-icon" />,
  WifiOff: () => <div data-testid="wifi-off-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
}));

jest.mock('@/components/ChatHeader', () => {
  return function MockChatHeader({ user }: { user: ChatUser }) {
    return <div data-testid="chat-header">{user.name}</div>;
  };
});

jest.mock('@/components/Loading', () => {
  return function MockLoading({ msg }: { msg: string }) {
    return <div data-testid="loading">{msg}</div>;
  };
});

describe('ChatWindow', () => {
  const user: ChatUser = {
    id: '1',
    name: 'John',
    age: 25,
    profession: 'Engineer',
    images: ['/avatar.jpg'],
    dateOfBirth: '2000-01-01',
    startedConversation: true,
  };

  const messages = [
    { id: '1', text: 'Hello!', sender: 'them' as const, timestamp: '10:30' },
    { id: '2', text: 'Hi there!', sender: 'me' as const, timestamp: '10:31', delivered: true },
    { id: '3', text: 'How are you?', sender: 'them' as const, timestamp: '10:32' },
  ];

  const mockOnInputChange = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnSend = jest.fn();
  const mockOnRetryMessage = jest.fn();
  const mockOnUnmatched = jest.fn();
  const mockOnBack = jest.fn();

  const defaultProps = {
    selectedUser: user,
    messages,
    inputValue: '',
    onInputChange: mockOnInputChange,
    onKeyDown: mockOnKeyDown,
    onSend: mockOnSend,
    sending: false,
    lastSeenMessageId: '',
    matchId: 'match-123',
    onUnmatched: mockOnUnmatched,
    onBack: mockOnBack,
    onRetryMessage: mockOnRetryMessage,
    loading: false,
    typingUsers: {},
    userStatus: {
      status: 'online' as const,
      lastSeen: '2023-01-01T12:00:00Z',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows empty state when no user selected', () => {
    render(<ChatWindow {...defaultProps} selectedUser={null} />);
    expect(screen.getByText('Select a match to start chatting')).toBeInTheDocument();
    expect(screen.getByTestId('message-square-icon')).toBeInTheDocument();
  });

  it('shows loading state when loading is true', () => {
    render(<ChatWindow {...defaultProps} loading={true} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading messages...')).toBeInTheDocument();
  });

  it('renders messages when user is selected', () => {
    render(<ChatWindow {...defaultProps} />);
    expect(screen.getByTestId('chat-header')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('10:30')).toBeInTheDocument();
  });

  it('disables send button when input is empty', () => {
    render(<ChatWindow {...defaultProps} inputValue="" />);
    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeDisabled();
  });

  it('enables send button when input has text', () => {
    render(<ChatWindow {...defaultProps} inputValue="Hi there!" />);
    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeEnabled();
  });

  it('calls onSend when send button clicked', () => {
    render(<ChatWindow {...defaultProps} inputValue="Test message" />);
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    expect(mockOnSend).toHaveBeenCalledTimes(1);
  });

  it('calls onInputChange when typing in input', () => {
    render(<ChatWindow {...defaultProps} />);
    const input = screen.getByPlaceholderText(/say something nice/i);
    fireEvent.change(input, { target: { value: 'New message' } });
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls onKeyDown when key pressed in input', () => {
    render(<ChatWindow {...defaultProps} />);
    const input = screen.getByPlaceholderText(/say something nice/i);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnKeyDown).toHaveBeenCalledWith(expect.any(Object));
  });

  it('shows empty messages UI when no messages', () => {
    render(<ChatWindow {...defaultProps} messages={[]} />);
    expect(screen.getByText('Say Hi! 👋')).toBeInTheDocument();
    expect(screen.getByTestId('message-dashed-icon')).toBeInTheDocument();
    expect(screen.getByText('You have got a match! Send a message to start chatting.')).toBeInTheDocument();
  });

  it('displays multiple messages correctly', () => {
    render(<ChatWindow {...defaultProps} />);
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
  });

  it('shows seen indicator for the last seen message', () => {
    render(<ChatWindow {...defaultProps} lastSeenMessageId="2" />);
    const seenAvatar = screen.getByAltText('Seen');
    expect(seenAvatar).toBeInTheDocument();
    expect(seenAvatar).toHaveAttribute('src', '/avatar.jpg');
  });

  it('does not show seen indicator for messages not marked as seen', () => {
    render(<ChatWindow {...defaultProps} lastSeenMessageId="1" />);
    const seenAvatars = screen.queryAllByAltText('Seen');
    expect(seenAvatars).toHaveLength(0);
  });

  it('only shows seen indicator for messages sent by me', () => {
    render(<ChatWindow {...defaultProps} lastSeenMessageId="1" />);
    const seenAvatars = screen.queryAllByAltText('Seen');
    expect(seenAvatars).toHaveLength(0);
  });

  it('displays online status indicator', () => {
    render(<ChatWindow {...defaultProps} />);
    expect(screen.getByTestId('wifi-icon')).toBeInTheDocument();
    expect(screen.getByText('online')).toBeInTheDocument();
  });

  it('displays offline status indicator', () => {
    render(<ChatWindow {...defaultProps} userStatus={{ status: 'offline', lastSeen: '2023-01-01T12:00:00Z' }} />);
    expect(screen.getByTestId('wifi-off-icon')).toBeInTheDocument();
    expect(screen.getByText('offline')).toBeInTheDocument();
    expect(screen.getByText(/Last seen:/)).toBeInTheDocument();
  });

  it('displays away status indicator', () => {
    render(<ChatWindow {...defaultProps} userStatus={{ status: 'away', lastSeen: '2023-01-01T12:00:00Z' }} />);
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
    expect(screen.getByText('away')).toBeInTheDocument();
  });

  it('shows typing indicator when user is typing', () => {
    render(<ChatWindow {...defaultProps} typingUsers={{ '1': true }} />);
    const typingDots = screen.getAllByRole('generic').filter((element) => element.className.includes('animate-bounce'));
    expect(typingDots).toHaveLength(3);
  });

  it('shows retry button for failed messages', () => {
    const failedMessages = [...messages, { id: '4', text: 'Failed message', sender: 'me' as const, timestamp: '10:33', failed: true }];
    render(<ChatWindow {...defaultProps} messages={failedMessages} />);
    const retryButton = screen.getByText('retry');
    expect(retryButton).toBeInTheDocument();
    fireEvent.click(retryButton);
    expect(mockOnRetryMessage).toHaveBeenCalledWith('4');
  });

  it('shows delivered indicator for delivered messages', () => {
    render(<ChatWindow {...defaultProps} />);
    const deliveredIndicator = screen.getByText('✓');
    expect(deliveredIndicator).toBeInTheDocument();
  });

  it('shows back button on mobile when onBack is provided', () => {
    render(<ChatWindow {...defaultProps} />);
    const backButton = screen.getByTestId('arrow-left-icon').closest('button');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveClass('md:hidden');
  });

  it('calls onBack when back button is clicked', () => {
    render(<ChatWindow {...defaultProps} />);
    const backButton = screen.getByTestId('arrow-left-icon').closest('button');
    fireEvent.click(backButton!);
    expect(mockOnBack).toHaveBeenCalled();
  });
});
