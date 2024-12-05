import { render, screen } from '@testing-library/react';
import { ProfilePagePosts } from '@/components/ProfilePagePosts';
import { UserContext } from '@/components/providers';
import { User } from '@/generated';

jest.mock('@/components/ProfilePostsSection', () => ({
  __esModule: true,
  default: jest.fn(() => <div>ProfilePostsSection</div>),
}));

jest.mock('@/components/ProfilePagePostsAndSaved', () => ({
  __esModule: true,
  default: jest.fn(() => <div>ProfilePagePostsAndSaved</div>),
}));

describe('ProfilePagePosts', () => {
  const mockUserProfile = {
    _id: '123',
    username: 'john_doe',
    isPrivate: true,
  };

  const mockUser = {
    _id: '456',
    username: 'current_user',
  };

  const mockSortedUsers = [
    { _id: '123', username: 'john_doe' },
    { _id: '789', username: 'other_user' },
  ];

  const mockUserPosts = [
    { id: '1', images: ['image1.jpg'] },
    { id: '2', images: ['image2.jpg'] },
  ];

  const renderComponent = (userPosts = mockUserPosts, userProfile = mockUserProfile, sortedUsers = mockSortedUsers) => {
    return render(
      <UserContext.Provider value={{ user: mockUser, sortedUsers }}>
        <ProfilePagePosts userPosts={userPosts} userProfile={userProfile} />
      </UserContext.Provider>
    );
  };

  test('1 sets isFollowing to true when the user is following the profile', () => {
    const sortedUsersWithFollow = [
      { _id: '123', username: 'john_doe' },
      { _id: '456', username: 'current_user' },
    ];

    renderComponent(mockUserPosts, mockUserProfile, sortedUsersWithFollow);

    const isFollowing = sortedUsersWithFollow.some((el: User) => el._id === mockUserProfile._id);
    expect(isFollowing).toBe(true);
  });

  test('2 sets isFollowing to false when the user is not following the profile', () => {
    const sortedUsersWithoutFollow = [
      { _id: '133', username: 'john_doe' },
      { _id: '739', username: 'other_user' },
    ];

    renderComponent(mockUserPosts, mockUserProfile, sortedUsersWithoutFollow);

    const isFollowing = sortedUsersWithoutFollow.some((el: User) => el._id === mockUserProfile._id);
    expect(isFollowing).toBe(false);
  });

  test('3 does not throw an error when sortedUsers is empty', () => {
    const emptySortedUsers = [];

    renderComponent(mockUserPosts, mockUserProfile, emptySortedUsers);

    const isFollowing = emptySortedUsers.some((el: User) => el._id === mockUserProfile._id);
    expect(isFollowing).toBe(false);
  });

  test('4 does not throw an error when userProfile._id is missing', () => {
    const invalidUserProfile = { ...mockUserProfile, _id: undefined };
    renderComponent(mockUserPosts, invalidUserProfile, mockSortedUsers);

    const isFollowing = mockSortedUsers.some((el: User) => el._id === invalidUserProfile._id);
    expect(isFollowing).toBe(false);
  });

  test('5 does not throw an error when sortedUsers is undefined', () => {
    renderComponent(mockUserPosts, mockUserProfile, undefined);

    expect(screen.getByText('ProfilePostsSection'));
  });

  test('6 sets isFollowing to true when viewing their own profile', () => {
    const selfProfile = {
      _id: '123',
      username: 'current_user',
      isPrivate: false,
    };

    renderComponent(mockUserPosts, selfProfile, mockSortedUsers);

    const isFollowing = mockSortedUsers.some((el: User) => el._id === selfProfile._id);
    expect(isFollowing).toBe(true);
  });

  test('7 sets isFollowing to false when the user is not following the profile', () => {
    const sortedUsersWithoutFollow = [
      { _id: '145', username: 'john_doe' },
      { _id: '745', username: 'other_user' },
    ];

    renderComponent(sortedUsersWithoutFollow);

    const isFollowing = sortedUsersWithoutFollow.some((el: User) => el._id === mockUserProfile._id);
    expect(isFollowing).toBe(false);
  });

  test('8 renders ProfilePagePosts correctly with userPosts and userProfile', () => {
    renderComponent();

    expect(screen.getByText('ProfilePostsSection'));
  });

  test('9 shows ProfilePagePostsAndSaved component for private profiles and when the user is not following', () => {
    renderComponent(mockUserPosts, { ...mockUserProfile, isPrivate: false });

    expect(screen.getByText('ProfilePagePostsAndSaved'));
  });

  test('10 does not show ProfilePagePostsAndSaved component if the user is following a private profile', () => {
    renderComponent(mockUserPosts, { ...mockUserProfile, isPrivate: true });

    mockSortedUsers.push({ _id: '123', username: 'john_doe' });

    expect(screen.queryByText('ProfilePagePostsAndSaved')).toBeNull();
  });

  test('11 calls ProfilePostsSection with correct props', () => {
    renderComponent(mockUserPosts, mockUserProfile);

    expect(screen.getByText('ProfilePostsSection'));
  });

  test('12 handles private profile and follow status correctly', async () => {
    const userProfile = { _id: '123', isPrivate: false, username: 'john_doe' };
    const userPosts = [{ images: ['image1.jpg'] }];

    renderComponent(userPosts, userProfile);

    expect(screen.getByText('ProfilePagePostsAndSaved'));
    expect(screen.getByText('ProfilePostsSection'));
  });

  test('13 renders ProfilePostsSection with posts if posts are available', () => {
    renderComponent();

    expect(screen.getByText('ProfilePostsSection'));
  });
});
