/* eslint-disable react/display-name */
import Header from '@/components/layout/Header';
import { useAuth } from '@/components/providers';
import { render } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
// Mock the useAuth hook
jest.mock('../../../src/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
  link: jest.fn(),
}));

describe('Header', () => {
  const mockSignout = jest.fn();

  it('1. renders successfully with authenticated user', () => {
    // Set up mock return value for useAuth
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'wqwe' },
      signout: mockSignout,
    });

    render(<Header />);
  });
  it('2. renders successfully with authenticated user', () => {
    // Set up mock return value for useAuth
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      signout: mockSignout,
    });

    render(<Header />);
  });
});
