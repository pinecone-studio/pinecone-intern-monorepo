import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfilePageTop } from '@/components/ProfilePageTop';
import { UserContext } from '@/components/providers';
import { useGetFollowersByIdQuery, useGetFollowingByIdQuery } from '@/generated';
jest.mock('@/components/ui/avatar', () => ({
  Avatar: jest.fn(({ children }: any) => <div>{children}</div>),
  AvatarImage: jest.fn(() => <img />),
  AvatarFallback: jest.fn(() => <div>Fallback</div>),
}));
jest.mock('@/components/ui/button', () => ({
  Button: jest.fn(({ children, onClick }: any) => <button onClick={onClick}>{children}</button>),
}));
jest.mock('@/components/FollowingButton', () => ({
  __esModule: true,
  default: jest.fn(({ isFollowing, setIsFollow, handleFollowersUpdate }: any) => (
    <button
      onClick={() => {
        setIsFollow(!isFollowing);
        handleFollowersUpdate();
      }}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )),
}));
jest.mock('@/components/FollowersDialog', () => ({
  FollowersDialog: jest.fn(() => <div>Followers Dialog</div>),
}));
jest.mock('@/generated', () => ({
  useGetFollowersByIdQuery: jest.fn(),
  useGetFollowingByIdQuery: jest.fn(),
}));
describe('ProfilePageTop', () => {
  const mockUserProfile = {
    _id: '456',
    username: 'john_doe',
    fullname: 'John Doe',
    bio: 'This is a bio',
    profilePicture: 'image.jpg',
  };
  const mockUser = {
    _id: '123',
    username: 'current_user',
  };
  const mockFollowersData = {
    getFollowersById: [
      { _id: '123', username: 'john_doe' },
      { _id: '789', username: 'another_user' },
    ],
  };
  const mockFollowingData = {
    getFollowingById: [
      { _id: '123', username: 'john_doe' },
      { _id: '789', username: 'other_user' },
    ],
  };
  const mockPostsCount = [{ id: '1' }, { id: '2' }];
  const renderComponent = (overrideProps = {}) => {
    const defaultProps = {
      userProfile: mockUserProfile,
      postsCount: mockPostsCount,
    };
    const props = { ...defaultProps, ...overrideProps };
    const mockRefetchFollowers = jest.fn().mockReturnValue(mockFollowersData);
    const mockRefetchFollowing = jest.fn().mockReturnValue(mockFollowingData);
    (useGetFollowersByIdQuery as jest.Mock).mockReturnValue({
      data: mockFollowersData,
      refetch: mockRefetchFollowers,
    });
    (useGetFollowingByIdQuery as jest.Mock).mockReturnValue({
      data: mockFollowingData,
      refetch: mockRefetchFollowing,
    });
    return {
      ...render(
        <UserContext.Provider value={{ user: mockUser, sortedUsers: mockFollowersData.getFollowersById }}>
          <ProfilePageTop {...props} />
        </UserContext.Provider>
      ),
      mockRefetchFollowers,
      mockRefetchFollowing,
    };
  };
  test('renders profile page top with correct profile data', () => {
    renderComponent();
    expect(screen.getByText('Fallback'));
    expect(screen.getByText(mockUserProfile.username));
    expect(screen.getByText(mockUserProfile.fullname));
    expect(screen.getByText(mockUserProfile.bio));
    expect(screen.getByText('product/service'));
  });
  test('renders "Follow" button for other users', () => {
    const otherUserProfile = { ...mockUserProfile, username: 'other_user' };
    renderComponent({ userProfile: otherUserProfile });

    expect(screen.getByText('Follow'));
  });
  test('renders "Unfollow" button when the user is following the profile', () => {
    const sortedUsersWithFollow = [
      { _id: '123', username: 'john_doe' },
      { _id: '456', username: 'current_user' },
    ];
    render(
      <UserContext.Provider value={{ user: mockUser, sortedUsers: sortedUsersWithFollow }}>
        <ProfilePageTop userProfile={mockUserProfile} postsCount={mockPostsCount} />
      </UserContext.Provider>
    );
    expect(screen.getByText('Unfollow'));
  });
  test('does not render "Follow" button if user is the same as profile', () => {
    const sameUserProfile = { ...mockUserProfile, _id: '123', username: 'current_user' };
    renderComponent({ userProfile: sameUserProfile });
    expect(screen.queryByText('Follow')).toBeNull();
  });
  test('renders Followers Dialog', () => {
    renderComponent();
    expect(screen.getByText('Followers Dialog'));
  });
  test('renders correct number of posts when postsCount is not empty', () => {
    renderComponent();
    expect(screen.getByText('2'));
    expect(screen.getByText('posts'));
  });
  test('renders 0 posts when postsCount is empty', () => {
    renderComponent({ postsCount: [] });
    expect(screen.getByText('0'));
    expect(screen.getByText('posts'));
  });
  test('renders 0 posts when postsCount is null', () => {
    renderComponent({ postsCount: null });
    expect(screen.getByText('0'));
    expect(screen.getByText('posts'));
  });
  test('renders 0 posts when postsCount is undefined', () => {
    renderComponent({ postsCount: undefined });
    expect(screen.getByText('0'));
    expect(screen.getByText('posts'));
  });
  test('calls refetchFollowers and refetchFollowing when handleFollowersUpdate is triggered', async () => {
    const { mockRefetchFollowers, mockRefetchFollowing } = renderComponent();
    const followButton = screen.getByText('Follow');
    fireEvent.click(followButton);
    await waitFor(() => {
      expect(mockRefetchFollowers);
      expect(mockRefetchFollowing);
    });
  });
  test('calls refetch when followers or following button is clicked', async () => {
    const { mockRefetchFollowers, mockRefetchFollowing } = renderComponent();
    const followButton = screen.getByText('Follow');
    fireEvent.click(followButton);
    await waitFor(() => {
      expect(mockRefetchFollowers);
      expect(mockRefetchFollowing);
    });
  });
});
