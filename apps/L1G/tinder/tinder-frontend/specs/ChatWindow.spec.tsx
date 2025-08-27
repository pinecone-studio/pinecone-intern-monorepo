/* eslint-disable react/function-component-definition */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatWindow from '@/components/ChatWindow';
import { ChatUser } from '@/components/ChatPage';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('lucide-react', () => ({
  MessageSquare: () => <div data-testid="message-square-icon" />,
  Send: () => <div data-testid="send-icon" />,
  MessageSquareDashedIcon: () => <div data-testid="message-dashed-icon" />,
}));

jest.mock('@/components/ChatHeader', () => {
  return function MockChatHeader() {
    return <div data-testid="chat-header">ChatHeader</div>;
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

  const messages = [{ id: 1, text: 'Hello!', sender: 'them' as const, timestamp: '10:30' }];

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
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty state when no user selected', () => {
    render(<ChatWindow {...defaultProps} selectedUser={null} />);
    expect(screen.getByText('Select a match to start chatting')).toBeInTheDocument();
  });

  it('renders messages when user is selected', () => {
    render(<ChatWindow {...defaultProps} />);
    expect(screen.getByTestId('chat-header')).toBeInTheDocument();
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
  });

  it('displays multiple messages correctly', () => {
    const multipleMessages = [
      { id: 1, text: 'Hello!', sender: 'them' as const, timestamp: '10:30' },
      { id: 2, text: 'Hi there!', sender: 'me' as const, timestamp: '10:31' },
      { id: 3, text: 'How are you?', sender: 'them' as const, timestamp: '10:32' },
    ];

    render(<ChatWindow {...defaultProps} messages={multipleMessages} />);

    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
  });
});
