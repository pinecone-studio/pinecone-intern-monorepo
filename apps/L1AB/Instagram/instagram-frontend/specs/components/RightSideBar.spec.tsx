import RightSideBar from '@/components/RightSideBar';
import { render } from '@testing-library/react';

describe('RightSideBar', () => {
  const mockUser = {
    username: 'test',
    fullname: 'test',
    profilePicture: 'https://test.com/.jpg',
  };

  test('renders user avatar, username, and fullname correctly', () => {
    render(<RightSideBar user={mockUser} />);
  });

  test('renders fallback avatar when no profile picture is provided', () => {
    const mockUserWithoutImage = { ...mockUser, profilePicture: '' };
    render(<RightSideBar user={mockUserWithoutImage} />);
  });

  test('renders nothing if user is not provided (user prop is undefined)', () => {
    render(<RightSideBar user={undefined} />);
  });
});
