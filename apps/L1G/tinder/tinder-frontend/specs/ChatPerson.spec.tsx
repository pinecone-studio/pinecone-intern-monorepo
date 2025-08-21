import ChatPerson from '@/components/ChatPerson';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

jest.mock('@/components/ChatWindow', () => ({
  __esModule: true,
  default: () => <div data-testid="chat-window">ChatWindow Component</div>,
}));

jest.mock('lucide-react', () => ({
  MessageSquareDashedIcon: () => <div data-testid="message-icon">MessageIcon</div>,
  Send: () => <div data-testid="send-icon">SendIcon</div>,
}));

describe('ChatPerson', () => {
  it('renders correctly', () => {
    render(<ChatPerson />);

    expect(screen.getByTestId('chat-window'));

    expect(screen.getByText('Esther Howard, 32'));
    expect(screen.getByText('Kathryn Murphy, 24'));
    expect(screen.getByText('Guy Hawkins, 41'));
    expect(screen.getByText('Jacob Jones, 20'));
  });

  it('displays all user information correctly', () => {
    render(<ChatPerson />);

    const jobTitles = screen.getAllByText('Software Engineer');
    expect(jobTitles).toHaveLength(4);

    expect(screen.getByAltText('Esther Howard'));
    expect(screen.getByAltText('Kathryn Murphy'));
    expect(screen.getByAltText('Guy Hawkins'));
    expect(screen.getByAltText('Jacob Jones'));
  });

  it('renders correct number of matches', () => {
    render(<ChatPerson />);

    const profileImages = screen.getAllByRole('img');
    expect(profileImages).toHaveLength(4);
  });

  it('has correct layout structure', () => {
    render(<ChatPerson />);

    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar);

    // Check if 'Esther Howard, 32' is inside the sidebar container
    expect(within(sidebar).getByText('Esther Howard, 32'));

    expect(screen.getByTestId('chat-window'));
  });

  it('displays users with different ages correctly', () => {
    render(<ChatPerson />);

    expect(screen.getByText(/32/));
    expect(screen.getByText(/24/));
    expect(screen.getByText(/41/));
    expect(screen.getByText(/20/));
  });
});
