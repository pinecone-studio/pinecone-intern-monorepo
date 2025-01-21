import Post from '@/components/profile/Post';
import Profile from '@/components/profile/Profile';
import { useAuth } from '@/components/providers/AuthProvider';
import { render, screen } from '@testing-library/react';

jest.mock('../../../src/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));
describe('Profile', () => {
  it('Should render', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        bio: '',
      },
    });
    render(<Profile />);
  });
  it('Should show empty post', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        bio: '',
      },
    });
    render(<Profile />);
    expect(screen.getByTestId('post-empty')).toBeDefined();
  });
  it('Should show post', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        bio: 'hi',
      },
    });
    render(<Profile />);
  });
});
describe('Post', () => {
  it('Should render', () => {
    render(<Post />);
    expect(screen.getByTestId('profile-post')).toBeDefined();
  });
});
