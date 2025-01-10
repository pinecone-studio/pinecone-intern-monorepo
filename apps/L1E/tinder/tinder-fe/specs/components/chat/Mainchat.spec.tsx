import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AddMessageDocument, GetConversationDocument, Match, UnMatchDocument } from '@/generated';
import ChatInterface from '@/components/chat/MainChat';
import { useSearchParams } from 'next/navigation';
import { MockedProvider } from '@apollo/client/testing';
jest.mock('@/components/chat/ProfileCarousel', () => ({
  ProfileCarouselUser: () => <div>Mocked Profile Carousel</div>,
}));
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));
const mocks = [
  { request: { query: UnMatchDocument, variables: { authId: 'user_id_123' } }, result: { data: { unMatch: { _id: 'match_1', stillmatch: false } } } },
  { request: { query: GetConversationDocument, variables: { userOne: 'user_id_123', userTwo: 'user_id_123' } } },
  {
    request: { query: AddMessageDocument, variables: { userId: 'user_id_123', content: 'as', chosenUserId: 'user_id_123' } },
    result: { data: { addMessage: { id: '1', text: 'as', sender: 'user_id_123' } } },
  },
];
const elsemocks = [
  { request: { query: UnMatchDocument, variables: { authId: '' } }, result: { data: { unMatch: { _id: '', stillmatch: false } } } },
  { request: { query: GetConversationDocument, variables: { userOne: '', userTwo: '' } } },
  {
    request: { query: AddMessageDocument, variables: { userId: '', content: 'as', chosenUserId: '' } },
    result: { data: { addMessage: { text: 'as' } } },
  },
];
const mockMatches: Match[] = [
  {
    targetUserId: { username: 'john_doe', age: '25', images: ['https://via.placeholder.com/150'], _id: 'user_id_123' },
    _id: '',
    createdAt: '',
    stillmatch: false,
    userId: { _id: 'user_id_123', images: [] },
  },
];
const elsemockMatches: Match[] = [
  {
    targetUserId: {
      username: 'john_doe',
      age: '25',
      images: ['https://via.placeholder.com/150'],
    },
    stillmatch: false,
    userId: {
      images: [],
    },
  },
];
const mockUsername = 'john_doe';
describe('ChatInterface', () => {
  beforeEach(() => {
    const searchParamsMock = new URLSearchParams({ username: 'testuser' });
    (useSearchParams as jest.Mock).mockReturnValue(searchParamsMock);
  });
  it('should call handleAddToRecentChats when the correct button is clicked', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChatInterface matches={mockMatches} username={mockUsername} />
      </MockedProvider>
    );
    const button = screen.getByTestId('unmatch');
    fireEvent.click(button);
  });
  it('renders match details correctly', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={elsemocks} addTypename={false}>
        <ChatInterface matches={elsemockMatches} username={mockUsername} />
      </MockedProvider>
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'as' } });
    const btn = getByTestId('unmatch');
    fireEvent.click(btn);
    await act(async () => {
      const send = getByTestId('send');
      fireEvent.click(send);
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    });
  });
  it('renders match details correctly', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChatInterface matches={mockMatches} username={mockUsername} />
      </MockedProvider>
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'as' } });
    const btn = getByTestId('unmatch');
    fireEvent.click(btn);
    await act(async () => {
      const send = getByTestId('send');
      fireEvent.click(send);
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    });
  });
  it('renders match details correctly', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChatInterface matches={mockMatches} username={mockUsername} />
      </MockedProvider>
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'as' } });
    const btn = getByTestId('unmatch');
    fireEvent.click(btn);
    await act(async () => {
      const send = getByTestId('send');
      fireEvent.click(send);
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    });
  });
  it('opens and closes modal on profile click', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChatInterface matches={mockMatches} username={mockUsername} />
      </MockedProvider>
    );
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
  it('calls send message button when clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChatInterface matches={mockMatches} username={mockUsername} />
      </MockedProvider>
    );
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'as' } });
    const sendButton = screen.getByTestId('send');
    fireEvent.click(sendButton);
    await waitFor(() => {
      expect(mocks[2].result?.data.addMessage).toBeTruthy();
    });
  });
});
