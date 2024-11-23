import { ProfilePageTop } from '@/components/ProfilePageTop';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { userContext } from '../../src/app/(main)/layout';

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
    render(
      <userContext.Provider value={{ user: mockUser }}>
        <ProfilePageTop />
      </userContext.Provider>
    );
  });
});
