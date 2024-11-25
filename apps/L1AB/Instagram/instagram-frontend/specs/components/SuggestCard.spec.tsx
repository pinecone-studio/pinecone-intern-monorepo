import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SuggestCard } from '@/components/SuggestCard';
import { userContext } from '../../src/app/(main)/layout';

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
    render(
      <userContext.Provider value={{ user: mockUser, users: mockUser }}>
        <SuggestCard />
      </userContext.Provider>
    );
  });
});
