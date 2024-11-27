import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SuggestCard } from '@/components/SuggestCard';
import { userContext } from '../../src/app/(main)/layout';
import { useCreateFollowersMutation } from '@/generated';
jest.mock('@/generated', () => ({
  useCreateFollowersMutation: jest.fn(),
}));
describe('SuggestCard', () => {
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
  it('sould render successfully', async () => {
    const mockCreateFollowers = jest.fn().mockResolvedValue({
      data: { createFollowers: { id: 'new-follower-id', followeeId: 'some-id' } },
    });

    useCreateFollowersMutation.mockReturnValue([mockCreateFollowers]);
    render(
      <userContext.Provider value={{ user: mockUser, users: mockUser }}>
        <SuggestCard />
      </userContext.Provider>
    );
  });
});
