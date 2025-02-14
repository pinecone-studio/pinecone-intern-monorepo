import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDeleteSearchUserMutation, useGetSearchedUserQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import { SavedUsers } from '@/components/search/SavedUsers';

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
      refetch: mockRefetch,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('calls deleteUser and refetch when delete button is clicked', async () => {
    render(<SavedUsers />);
    const deleteButton = screen.getByTestId('delete-saved-user');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mockDeleteUser).toHaveBeenCalledWith({ variables: { searchedUserId: '1' } }));
    await expect(mockRefetch).toHaveBeenCalled();
  });

  it('navigates to user profile when user is clicked', () => {
    render(<SavedUsers />);
    const userProfile = screen.getByText('testuser');
    fireEvent.click(userProfile);
    expect(mockPush).toHaveBeenCalledWith('/1');
  });
});
