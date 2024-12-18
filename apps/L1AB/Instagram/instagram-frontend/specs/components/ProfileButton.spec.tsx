import '@testing-library/jest-dom';
import { ProfileButton } from '@/components/ProfileButton';
import { AnimationControls } from 'framer-motion';
import { render } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { UserContext } from '@/components/providers/UserProvider';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
const mockSvgControls: AnimationControls = {
  start: jest.fn(),
  stop: jest.fn(),
  set: jest.fn(),
  mount: jest.fn(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }),
  subscribe: jest.fn(),
};

const sampleProps = {
  isOpen: true,
  svgControls: mockSvgControls,
};

describe('ProfileButton', () => {
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
  jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));
  it('should render successfully', () => {
    render(
      <UserContext.Provider value={{ user: mockUser, users: mockUser }}>
        <ProfileButton {...sampleProps} />
      </UserContext.Provider>
    );
  });
  it('should render Avatar with the correct className when pathname is /profile', () => {
    usePathname.mockReturnValue('/profile');

    render(
      <UserContext.Provider value={{ user: mockUser }}>
        <ProfileButton {...sampleProps} />
      </UserContext.Provider>
    );
  });
});
