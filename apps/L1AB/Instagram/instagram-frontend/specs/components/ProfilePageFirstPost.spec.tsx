import { ProfilePageFirstPost } from '@/components/ProfilePageFirstPost';
import { UserContext } from '@/components/providers';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('ProfilePageFirstPost', () => {
  it('should render successfully', async () => {
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
    jest.mock('next/navigation', () => ({
      useSearchParams: jest.fn(),
    }));
    render(
      <UserContext.Provider values={{ user: mockUser }}>
        <ProfilePageFirstPost />
      </UserContext.Provider>
    );
  });
});
