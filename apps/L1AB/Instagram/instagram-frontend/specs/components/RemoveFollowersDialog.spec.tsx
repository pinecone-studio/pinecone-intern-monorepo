import { RemoveFollowersDialog } from '@/components/RemoveFollowersDialog';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockHandleRemoveFollower = jest.fn();
const mockHandleRemoveFollowing = jest.fn();

describe('RemoveFollowersDialog', () => {
  test('opens dialog when Remove button is clicked', async () => {
    render(
      <RemoveFollowersDialog
        id="123"
        img="https://example.com/avatar.jpg"
        type="followers"
        name="John Doe"
        profileUser={{ _id: '456', username: 'testUser' }}
        handleRemoveFollower={mockHandleRemoveFollower}
        handleRemoveFollowing={mockHandleRemoveFollowing}
      />
    );

    const triggerButton = screen.getByText('Remove');
    fireEvent.click(triggerButton);

    expect(screen.getByText('Remove follower?'));
    expect(screen.getByText('Instagram won’t tell John Doe they were removed from your followers.'));
  });

  test('calls handleRemoveFollower when "Remove" is clicked for followers', async () => {
    render(
      <RemoveFollowersDialog
        id="123"
        img="https://example.com/avatar.jpg"
        type="followers"
        name="John Doe"
        profileUser={{ _id: '456', username: 'testUser' }}
        handleRemoveFollower={mockHandleRemoveFollower}
        handleRemoveFollowing={mockHandleRemoveFollowing}
      />
    );

    fireEvent.click(screen.getByTestId('remove-trigger'));
    fireEvent.click(screen.getByTestId('remove-button'));

    await waitFor(() => expect(mockHandleRemoveFollower).toHaveBeenCalledWith('123'));
  });

  test('calls handleRemoveFollowing when "Remove" is clicked for following', async () => {
    render(
      <RemoveFollowersDialog
        id="123"
        img="https://example.com/avatar.jpg"
        type="following"
        name="John Doe"
        profileUser={{ _id: '456', username: 'testUser' }}
        handleRemoveFollower={mockHandleRemoveFollower}
        handleRemoveFollowing={mockHandleRemoveFollowing}
      />
    );

    fireEvent.click(screen.getByTestId('remove-trigger'));
    fireEvent.click(screen.getByTestId('remove-button'));

    await waitFor(() => expect(mockHandleRemoveFollowing).toHaveBeenCalledWith('123'));
  });
});
