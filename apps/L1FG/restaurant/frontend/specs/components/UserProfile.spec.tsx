import { render } from '@testing-library/react';
import UserProfile from '@/components/user-profile/UserProfile';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('UserProfile Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('does not redirect if a valid user exists in localStorage', () => {
    const mockUser = { email: 'test@example.com', phoneNumber: '123456789', profileImage: '/test-image.jpg', password: 'password' };
    localStorage.setItem('user', JSON.stringify(mockUser));

    render(<UserProfile />);
  });

  it('redirects to login page if no user exists in localStorage', () => {
    render(<UserProfile />);
  });
});
