import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Match } from '@/generated';
import ChatInterface from '@/components/chat/MainChat';
import { useSearchParams } from 'next/navigation';

jest.mock('@/components/chat/ProfileCarousel', () => ({
  ProfileCarouselUser: () => <div>Mocked Profile Carousel</div>,
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

const mockMatches: Match[] = [
  {
    targetUserId: {
      username: 'john_doe',
      age: '25',
      profession: 'Software Engineer',
      images: ['https://via.placeholder.com/150'],
      _id: '',
      bio: '',
      createdAt: undefined,
      email: '',
      interest: '',
      job: '',
      match: '',
      password: '',
      updatedAt: undefined,
    },
    _id: '',
    createdAt: '',
    stillmatch: false,
    userId: {
      __typename: undefined,
      _id: '',
      age: '',
      bio: '',
      createdAt: undefined,
      email: '',
      hobby: undefined,
      images: [],
      interest: '',
      job: '',
      match: '',
      password: '',
      profession: '',
      updatedAt: undefined,
      username: '',
    },
  },
];

const mockUsername = 'john_doe';

describe('ChatInterface', () => {
  beforeEach(() => {
    const searchParamsMock = new URLSearchParams({ username: 'testuser' });
    (useSearchParams as jest.Mock).mockReturnValue(searchParamsMock);
  });

  it('renders match details correctly', () => {
    render(<ChatInterface matches={mockMatches} username={mockUsername} />);

    expect(screen.getByText(/john_doe,/i));
    expect(screen.getByText('25'));
    expect(screen.getByText('Software Engineer'));
  });

  it('opens and closes modal on profile click', async () => {
    render(<ChatInterface matches={mockMatches} username={mockUsername} />);

    const viewProfileButton = screen.getByTestId('view');

    fireEvent.click(viewProfileButton);

    await waitFor(() => expect(screen.getByRole('dialog')));

    const modal = screen.getByRole('dialog');
    expect(modal);

    fireEvent.mouseDown(document);

    await waitFor(() => expect(modal).not);

    fireEvent.click(viewProfileButton);
    await waitFor(() => expect(screen.getByRole('dialog')));

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(modal).not);
  });

  it('calls send message button when clicked', () => {
    render(<ChatInterface matches={mockMatches} username={mockUsername} />);

    const sendButton = screen.getByText(/You’ve got a match! Send a message to start chatting./i);
    fireEvent.click(sendButton);
  });
});
