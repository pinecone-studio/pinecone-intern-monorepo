/* eslint-disable max-lines */
/* eslint-disable react/function-component-definition */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatWindow from '@/components/ChatWindow';
import { ChatUser } from 'types/chat';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('lucide-react', () => ({
  MessageSquare: () => <div data-testid="message-square-icon" />,
  Send: () => <div data-testid="send-icon" />,
  MessageSquareDashedIcon: () => <div data-testid="message-dashed-icon" />,
}));

jest.mock('@/components/ChatHeader', () => {
  return function MockChatHeader({ user }: { user: ChatUser }) {
    return <div data-testid="chat-header">{user.name}</div>;
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
    { id: '2', text: 'Hi there!', sender: 'me' as const, timestamp: '10:31' },
    { id: '3', text: 'How are you?', sender: 'them' as const, timestamp: '10:32' },
  ];

  const mockOnInputChange = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnSend = jest.fn();

  const defaultProps = {
    selectedUser: user,
    messages,
    inputValue: '',
    onInputChange: mockOnInputChange,
    onKeyDown: mockOnKeyDown,
    onSend: mockOnSend,
    sending: false,
    lastSeenMessageId: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty state when no user selected', () => {
    render(<ChatWindow {...defaultProps} selectedUser={null} />);
    expect(screen.getByText('Select a match to start chatting')).toBeInTheDocument();
    expect(screen.getByTestId('message-square-icon')).toBeInTheDocument();
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

  it('disables send button when sending is true', () => {
    render(<ChatWindow {...defaultProps} inputValue="Hi there!" sending={true} />);
    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeDisabled();
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
    expect(mockOnInputChange).toHaveBeenCalled();
  });

  it('calls onKeyDown when key pressed in input', () => {
    render(<ChatWindow {...defaultProps} />);
    const input = screen.getByPlaceholderText(/say something nice/i);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  it('shows empty messages UI when no messages', () => {
    render(<ChatWindow {...defaultProps} messages={[]} />);
    expect(screen.getByText('Say Hi!')).toBeInTheDocument();
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
  it('calls scrollIntoView with "auto" when messages length is 1 or less', () => {
    const scrollIntoViewMock = jest.fn();
    jest.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(scrollIntoViewMock);

    render(<ChatWindow {...defaultProps} messages={[messages[0]]} />);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'auto',
    });
  });

  it('calls scrollIntoView with "smooth" when messages length is greater than 1', () => {
    const scrollIntoViewMock = jest.fn();
    jest.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(scrollIntoViewMock);

    render(<ChatWindow {...defaultProps} />);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });
});
