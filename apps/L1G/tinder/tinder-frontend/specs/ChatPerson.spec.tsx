import ChatPerson from '@/components/ChatPerson';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

jest.mock('@/components/ChatWindow', () => {
  return function MockChatWindow() {
    return <div data-testid="chat-window">ChatWindow Component</div>;
  };
});

jest.mock('lucide-react', () => ({
  MessageSquareDashedIcon: () => <div data-testid="message-icon">MessageIcon</div>,
  Send: () => <div data-testid="send-icon">SendIcon</div>,
}));

describe('ChatPerson', () => {
  it('renders correctly', () => {
    render(<ChatPerson />);
    
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();
    
    expect(screen.getByText('Esther Howard, 32')).toBeInTheDocument();
    expect(screen.getByText('Kathryn Murphy, 24')).toBeInTheDocument();
    expect(screen.getByText('Guy Hawkins, 41')).toBeInTheDocument();
    expect(screen.getByText('Jacob Jones, 20')).toBeInTheDocument();
  });

  it('displays all user information correctly', () => {
    render(<ChatPerson />);
    
    const jobTitles = screen.getAllByText('Software Engineer');
    expect(jobTitles).toHaveLength(4);
    
    expect(screen.getByAltText('Esther Howard')).toBeInTheDocument();
    expect(screen.getByAltText('Kathryn Murphy')).toBeInTheDocument();
    expect(screen.getByAltText('Guy Hawkins')).toBeInTheDocument();
    expect(screen.getByAltText('Jacob Jones')).toBeInTheDocument();
  });

  it('renders correct number of matches', () => {
    render(<ChatPerson />);
    
    const profileImages = screen.getAllByRole('img');
    expect(profileImages).toHaveLength(4);
  });

  it('has correct layout structure', () => {
    render(<ChatPerson />);
    
    const sidebar = screen.getByText('Esther Howard, 32').closest('.w-\\[300px\\]');
    expect(sidebar).toBeInTheDocument();
    
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();
  });

  it('displays users with different ages correctly', () => {
    render(<ChatPerson />);
    
    expect(screen.getByText(/32/)).toBeInTheDocument();
    expect(screen.getByText(/24/)).toBeInTheDocument();
    expect(screen.getByText(/41/)).toBeInTheDocument(); 
    expect(screen.getByText(/20/)).toBeInTheDocument(); 
  });
});