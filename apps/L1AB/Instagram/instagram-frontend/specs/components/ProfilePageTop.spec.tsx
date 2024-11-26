import { ProfilePageTop } from '@/components/ProfilePageTop';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { userContext } from '../../src/app/(main)/layout';
import { useGetFollowersByIdQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetFollowersByIdQuery: jest.fn(),
}));
describe('ProfilePagePosts', () => {
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
  it('should render successfully', async () => {
    const mockFollowersData = {
      data: {
        getFollowersById: [
          { id: '1', username: 'follower1' },
          { id: '2', username: 'follower2' },
        ],
      },
    };

    useGetFollowersByIdQuery.mockReturnValue({
      data: mockFollowersData,
    });
    render(
      <userContext.Provider value={{ user: mockUser, users: mockUser }}>
        <ProfilePageTop />
      </userContext.Provider>
    );
  });
});
