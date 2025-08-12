import ChatWindow from '@/components/ChatWindow';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

jest.mock('lucide-react', () => ({
  MessageSquareDashedIcon: ({ size, color }) => (
    <div data-testid="message-icon" data-size={size} data-color={color}>
      MessageIcon
    </div>
  ),
  Send: ({ size }) => (
    <div data-testid="send-icon" data-size={size}>
      SendIcon
    </div>
  ),
}));

describe('ChatWindow', () => {
  it('renders correctly', () => {
    render(<ChatWindow />);
    
    expect(screen.getByText('Bessie Cooper, 32')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByAltText('Bessie Cooper')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /view profile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /unmatch/i })).toBeInTheDocument();
  });

  it('displays empty state message', () => {
    render(<ChatWindow />);
    
    expect(screen.getByText('Say Hi!')).toBeInTheDocument();
    expect(screen.getByText("You have got a match! Send a message to start chatting.")).toBeInTheDocument();
    expect(screen.getByTestId('message-icon')).toBeInTheDocument();
  });

  it('renders message input and send button', () => {
    render(<ChatWindow />);
    
    const messageInput = screen.getByPlaceholderText('Say something nice');
    expect(messageInput).toBeInTheDocument();
    expect(messageInput).toHaveAttribute('type', 'text');
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeInTheDocument();
    expect(screen.getByTestId('send-icon')).toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    render(<ChatWindow />);
    
    const messageInput = screen.getByPlaceholderText('Say something nice');
    expect(messageInput).toHaveClass('focus:ring-2', 'focus:ring-pink-500');
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toHaveClass('bg-[#F43F5E]', 'hover:bg-pink-600');
  });
});