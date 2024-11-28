import { render } from '@testing-library/react';
import { ProfilePageTop } from '@/components/ProfilePageTop';
import { useGetFollowersByIdQuery } from '@/generated';
import { UserContext } from '@/components/providers';

jest.mock('@/generated', () => ({
  useGetFollowersByIdQuery: jest.fn(),
}));

describe('ProfilePageTop', () => {
  const mockUser = {
    _id: '134124',
    email: '123@gmail.com',
    username: 'blabla',
    fullname: 'blabla',
    gender: 'blabla',
    password: 'blabla',
    profilePicture: 'blabla',
    bio: 'blabla',
    isPrivate: false,
    createdAt: 'blabla',
    updatedAt: 'blabla',
  };

  const mockUserProfile = {
    _id: '134124',
    username: 'blabla',
    fullname: 'blabla',
    profilePicture: 'blabla',
    bio: 'blabla',
  };

  const mockFollowersData = {
    data: {
      getFollowersById: [
        { id: '1', username: 'follower1' },
        { id: '2', username: 'follower2' },
      ],
    },
  };

  beforeEach(() => {
    useGetFollowersByIdQuery.mockReturnValue({
      data: mockFollowersData,
    });
  });

  it('should render "Edit Profile" and "Ad tools" buttons when viewing own profile', () => {
    useGetFollowersByIdQuery({ variables: { id: mockUser._id || '' } });
    render(
      <UserContext.Provider value={{ user: mockUser, users: [mockUser] }}>
        <ProfilePageTop userProfile={mockUserProfile} postsCount={[]} />
      </UserContext.Provider>
    );
  });

  it('should render "Follow" and "Message" buttons when viewing another user\'s profile', () => {
    useGetFollowersByIdQuery({ variables: { id: mockUser._id || '' } });

    const differentUser = { ...mockUser, username: 'differentUser' };
    render(
      <UserContext.Provider value={{ user: differentUser, users: [differentUser] }}>
        <ProfilePageTop userProfile={mockUserProfile} postsCount={[]} />
      </UserContext.Provider>
    );
  });
});
