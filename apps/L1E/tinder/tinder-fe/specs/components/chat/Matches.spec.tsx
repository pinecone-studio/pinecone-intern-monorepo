import { render, screen, act, fireEvent } from '@testing-library/react';
import Matches from '@/components/chat/Matches';
import * as generatedHooks from '@/generated';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));
jest.mock('@/generated', () => ({
  useGetMatchedUsersQuery: jest.fn(),
  useGetUserByIdQuery: jest.fn(),
}));

const mockLocalStorage = {
  getItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('Matches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render matches and update with user details', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'authId' }));

    const mockMatchedUsers = [
      { _id: 'match1', targetUserId: { username: 'user1', images: ['image1.jpg'] } },
      { _id: 'match2', targetUserId: { username: 'user2', images: ['image1.jpg'] } },
    ];

    const mockUserDetails = {
      _id: 'user1',
      username: 'User One',
      age: 25,
      profession: 'Engineer',
      images: ['image1.jpg'],
    };

    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn().mockReturnValue('user1') });
    (generatedHooks.useGetMatchedUsersQuery as jest.Mock).mockReturnValue({ data: { getMatchedUsers: mockMatchedUsers }, loading: false });
    (generatedHooks.useGetUserByIdQuery as jest.Mock).mockReturnValue({ data: { getUserById: mockUserDetails } });

    await act(async () => {
      render(<Matches handleAddToRecentChats={jest.fn()} matches={[]} />);
    });

    expect(screen.queryByText('User One'));
    expect(screen.queryByText('25'));
    expect(screen.queryByText('Engineer'));
  });

  it('should handle no authId', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    (generatedHooks.useGetMatchedUsersQuery as jest.Mock).mockReturnValue({ loading: false, data: null });

    render(<Matches handleAddToRecentChats={jest.fn()} matches={[]} />);
  });

  it('should handle no matches', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'authId' }));

    (generatedHooks.useGetMatchedUsersQuery as jest.Mock).mockReturnValue({ data: { getMatchedUsers: [] }, loading: false });

    render(<Matches handleAddToRecentChats={jest.fn()} matches={[]} />);
  });

  it('should handle button click and call handleAddToRecentChats', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'authId' }));

    const mockMatchedUsers = [
      { _id: 'match1', targetUserId: { _id: 'user1', username: 'user1', images: ['image1.jpg'] }, createdAt: '2025-01-06T00:00:00Z', stillmatch: true, userIdts: 'user1' },
      { _id: 'match2', targetUserId: { _id: 'user2', username: 'user2', images: ['image1.jpg'] }, createdAt: '2025-01-06T00:00:00Z', stillmatch: true, userIdts: 'user2' },
    ];

    (generatedHooks.useGetMatchedUsersQuery as jest.Mock).mockReturnValue({ data: { getMatchedUsers: mockMatchedUsers }, loading: false });

    const handleAddToRecentChats = jest.fn();

    await act(async () => {
      render(<Matches handleAddToRecentChats={handleAddToRecentChats} matches={mockMatchedUsers} />);
    });

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(handleAddToRecentChats).toHaveBeenCalledWith('user1');
  });
});
