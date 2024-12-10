import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useCreateFollowersMutation, useDeleteFollowerMutation } from '@/generated';
import FollowingButton from '@/components/FollowingButton';

jest.mock('@/generated', () => ({
  useCreateFollowersMutation: jest.fn(),
  useDeleteFollowerMutation: jest.fn(),
}));

describe('FollowingButton Component', () => {
  const createMockUser = (overrides = {}) => ({
    _id: 'user-id',
    username: 'username',
    fullname: 'Full Name',
    ...overrides,
  });

  const createMockUserProfile = (overrides = {}) => ({
    _id: 'profile-id',
    username: 'profileuser',
    fullname: 'Profile User',
    profilePicture: 'profile-pic-url',
    bio: 'User bio',
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Follow button when not following', async () => {
    const currentUser = createMockUser();
    const profileUser = createMockUserProfile();
    const mockCreateFollowers = jest.fn().mockResolvedValue({ data: { success: true } });
    const mockDeleteFollower = jest.fn().mockResolvedValue({ data: { success: true } });
    useCreateFollowersMutation.mockReturnValue([mockCreateFollowers]);
    useDeleteFollowerMutation.mockReturnValue([mockDeleteFollower]);

    const handleFollowersUpdateMock = jest.fn();

    render(
      <FollowingButton
        setFollowersData={jest.fn()}
        isFollowing={true}
        setIsFollow={jest.fn()}
        userId={currentUser._id}
        profileUserId={profileUser._id}
        handleFollowersUpdate={handleFollowersUpdateMock}
      />
    );

    const followButton = screen.getByTestId('follow-button');
    fireEvent.click(followButton);

    await waitFor(() => {
      expect(handleFollowersUpdateMock).toHaveBeenCalled();
    });
  });

  it('should render Following button when already following', async () => {
    const currentUser = createMockUser();
    const profileUser = createMockUserProfile();
    const mockCreateFollowers = jest.fn().mockResolvedValue({ data: { success: true } });
    const mockDeleteFollower = jest.fn().mockResolvedValue({ data: { success: true } });
    useCreateFollowersMutation.mockReturnValue([mockCreateFollowers]);
    useDeleteFollowerMutation.mockReturnValue([mockDeleteFollower]);

    const handleFollowersUpdateMock = jest.fn();

    render(
      <FollowingButton
        setFollowersData={jest.fn()}
        isFollowing={false}
        setIsFollow={jest.fn()}
        userId={currentUser._id}
        profileUserId={profileUser._id}
        handleFollowersUpdate={handleFollowersUpdateMock}
      />
    );

    const followingButton = screen.getByTestId('following-button');
    fireEvent.click(followingButton);

    await waitFor(() => {
      expect(handleFollowersUpdateMock).toHaveBeenCalled();
    });
  });

  it('should call createFollowers mutation when clicking the Follow button', async () => {
    const currentUser = createMockUser();
    const profileUser = createMockUserProfile();
    const mockCreateFollowers = jest.fn().mockResolvedValue({ data: { success: true } });
    const mockDeleteFollower = jest.fn().mockResolvedValue({ data: { success: true } });
    useCreateFollowersMutation.mockReturnValue([mockCreateFollowers]);
    useDeleteFollowerMutation.mockReturnValue([mockDeleteFollower]);

    const handleFollowersUpdateMock = jest.fn();

    render(
      <FollowingButton
        setFollowersData={jest.fn()}
        isFollowing={true}
        setIsFollow={jest.fn()}
        userId={currentUser._id}
        profileUserId={profileUser._id}
        handleFollowersUpdate={handleFollowersUpdateMock}
      />
    );

    const followButton = await screen.findByTestId('follow-button');
    fireEvent.click(followButton);

    await waitFor(() => {
      expect(mockCreateFollowers).toHaveBeenCalledWith({
        variables: {
          followerId: currentUser._id,
          followeeId: profileUser._id,
        },
      });
      expect(handleFollowersUpdateMock).toHaveBeenCalled();
    });
  });

  it('should call deleteFollower mutation when clicking the Following button', async () => {
    const currentUser = createMockUser();
    const profileUser = createMockUserProfile();
    const mockCreateFollowers = jest.fn().mockResolvedValue({ data: { success: true } });
    const mockDeleteFollower = jest.fn().mockResolvedValue({ data: { success: true } });
    useCreateFollowersMutation.mockReturnValue([mockCreateFollowers]);
    useDeleteFollowerMutation.mockReturnValue([mockDeleteFollower]);

    const handleFollowersUpdateMock = jest.fn();

    render(
      <FollowingButton
        setFollowersData={jest.fn()}
        isFollowing={false}
        setIsFollow={jest.fn()}
        userId={currentUser._id}
        profileUserId={profileUser._id}
        handleFollowersUpdate={handleFollowersUpdateMock}
      />
    );

    const followingButton = await screen.findByTestId('following-button');
    fireEvent.click(followingButton);

    await waitFor(() => {
      expect(mockDeleteFollower).toHaveBeenCalledWith({
        variables: {
          followerId: currentUser._id,
          followeeId: profileUser._id,
        },
      });
      expect(handleFollowersUpdateMock).toHaveBeenCalled();
    });
  });
});
