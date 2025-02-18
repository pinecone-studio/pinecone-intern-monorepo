import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDeleteSearchUserMutation, useGetSearchedUserQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import { SavedUsers } from '@/components/search/SavedUsers';

import '@testing-library/jest-dom';

jest.mock('@/generated', () => ({
  useDeleteSearchUserMutation: jest.fn(),
  useGetSearchedUserQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SavedUsers Component', () => {
  const mockDeleteUser = jest.fn();
  const mockRefetch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useDeleteSearchUserMutation as jest.Mock).mockReturnValue([mockDeleteUser]);
    (useGetSearchedUserQuery as jest.Mock).mockReturnValue({
      data: {
        getSearchedUser: [
          {
            _id: '1',
            userName: 'testuser',
            fullName: 'Test User',
            profileImage: 'https://example.com/profile.jpg',
            friendshipStatus: { following: true },
          },
        ],
      },
      loading: false,
      refetch: mockRefetch,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('shows SearchSkeleton while loading', async () => {
    (useGetSearchedUserQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      refetch: mockRefetch,
    });

    render(<SavedUsers searchOpen={true} />);
    expect(await screen.findByTestId('search-skeleton')).toBeInTheDocument();
  });

  it('displays "No recent searches" when there are no saved users', () => {
    (useGetSearchedUserQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      refetch: mockRefetch,
    });

    render(<SavedUsers searchOpen={true} />);

    expect(screen.getByText('No recent searches')).toBeInTheDocument();
  });

  it('calls deleteUser and refetch when delete button is clicked', async () => {
    render(<SavedUsers searchOpen={true} />);
    const deleteButton = screen.getByTestId('delete-saved-user');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mockDeleteUser).toHaveBeenCalledWith({ variables: { searchedUserId: '1' } }));
    await waitFor(() => expect(mockRefetch).toHaveBeenCalled());
  });

  it('navigates to user profile when user is clicked', () => {
    render(<SavedUsers searchOpen={true} />);
    const userProfile = screen.getByText('testuser');
    fireEvent.click(userProfile);

    expect(mockPush).toHaveBeenCalledWith('/1');
  });
});
