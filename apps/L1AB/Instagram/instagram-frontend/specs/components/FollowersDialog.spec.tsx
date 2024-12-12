import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDeleteFollowerMutation } from '@/generated';
import { FollowersDialog } from '@/components/FollowersDialog';
import { useSearchParams } from 'next/navigation';
import { UserContext } from '@/components/providers';

jest.mock('@/generated', () => ({
  useDeleteFollowerMutation: jest.fn().mockReturnValue([jest.fn().mockResolvedValue({ data: { success: true } })]),
  useCreateFollowersMutation: jest.fn().mockReturnValue([jest.fn().mockResolvedValue({ data: { success: true } })]),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('FollowersDialog', () => {
  it('renders followers', () => {
    const followersData = [
      { _id: 'user1', username: 'user1', profilePicture: 'https://example.com/avatar1.jpg', fullname: 'User 1' },
      { _id: 'user2', username: 'user2', profilePicture: 'https://example.com/avatar2.jpg', fullname: 'User 2' },
    ];
    const profileUser = { _id: 'profile-user' };
    const handleFollowersUpdateMock = jest.fn();

    render(
      <UserContext.Provider value={{ user: { _id: 'profile-user', username: 'profile-user' } }}>
        <FollowersDialog followersData={followersData} followingData={[]} profileUser={profileUser} handleFollowersUpdate={handleFollowersUpdateMock} />
      </UserContext.Provider>
    );

    expect(screen.getByText('followers'));
  });

  it('handles follower removal', async () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('profile-user'),
    });
    const followersData = [
      { _id: 'user1', username: 'user1', profilePicture: 'https://example.com/avatar1.jpg', fullname: 'User 1' },
      { _id: 'user2', username: 'user2', profilePicture: 'https://example.com/avatar2.jpg', fullname: 'User 2' },
    ];
    const profileUser = { _id: 'profile-user', username: 'profile-user' };
    const deleteFollowerMock = useDeleteFollowerMutation()[0];
    const handleFollowersUpdateMock = jest.fn();

    render(
      <UserContext.Provider value={{ user: { _id: 'profile-user', username: 'profile-user' } }}>
        <FollowersDialog followersData={followersData} followingData={[]} profileUser={profileUser} handleFollowersUpdate={handleFollowersUpdateMock} />
      </UserContext.Provider>
    );

    const dialogTrigger = screen.getByTestId('followers-button');
    fireEvent.click(dialogTrigger);

    const removeButton = screen.getAllByTestId('remove-trigger')[0];
    fireEvent.click(removeButton);
    fireEvent.click(screen.getByTestId('remove-button'));

    await waitFor(() => {
      expect(deleteFollowerMock).toHaveBeenCalledWith({
        variables: {
          followerId: 'user1',
          followeeId: 'profile-user',
        },
      });
      expect(handleFollowersUpdateMock).toHaveBeenCalled();
    });
  });

  it('handles following removal', async () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('profile-user'),
    });
    const followingData = [
      { _id: 'user1', username: 'user1', profilePicture: 'https://example.com/avatar1.jpg', fullname: 'User 1' },
      { _id: 'user2', username: 'user2', profilePicture: 'https://example.com/avatar2.jpg', fullname: 'User 2' },
    ];
    const profileUser = { _id: 'profile-user', username: 'profile-user' };
    const deleteFollowerMock = useDeleteFollowerMutation()[0];
    const handleFollowersUpdateMock = jest.fn();

    render(
      <UserContext.Provider value={{ user: { _id: 'profile-user', username: 'profile-user' } }}>
        <FollowersDialog followersData={[]} followingData={followingData} profileUser={profileUser} handleFollowersUpdate={handleFollowersUpdateMock} />
      </UserContext.Provider>
    );

    const dialogTrigger = screen.getByTestId('following-button');
    fireEvent.click(dialogTrigger);

    const removeButton = screen.getAllByTestId('remove-trigger')[0];
    fireEvent.click(removeButton);
    fireEvent.click(screen.getByTestId('remove-button'));

    await waitFor(() => {
      expect(deleteFollowerMock).toHaveBeenCalledWith({
        variables: {
          followerId: 'profile-user',
          followeeId: 'user1',
        },
      });
      expect(handleFollowersUpdateMock).toHaveBeenCalled();
    });
  });
});
