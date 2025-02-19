import { NavigationBlue } from '@/components/user/main/NavigationBlue';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useAuth } from '@/components/providers';

// Мocks хийж, хэрэглэхийг шаардсан hook-ийг дуурайх
jest.mock('@/components/providers', () => ({
  useAuth: jest.fn(),
}));

describe('NavigationBlue', () => {
  it('should render successfully when user is logged in', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'John Doe' },
      signout: jest.fn(),
    });

    render(<NavigationBlue />);
  });

  it('should render successfully when user is not logged in', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      signout: jest.fn(),
    });

    const { getByText } = render(<NavigationBlue />);

    // Нэвтрээгүй хэрэглэгчийн хэсэг харагдах ёстой
    expect(getByText('Register'));
    expect(getByText('Sign in'));
  });
});
