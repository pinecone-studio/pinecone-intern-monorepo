import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useFetchProfileQuery } from '@/generated';

import UserHeader from '@/app/_components/UserHeader';
import '@testing-library/jest-dom';
import { useAuth } from '@/app/auth/context/AuthContext';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: any) => <a href={href}>{children}</a>;
  MockLink.displayName = 'NextLink';

  return MockLink;
});

jest.mock('@/app/auth/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/generated', () => ({
  useFetchProfileQuery: jest.fn(),
}));

describe('UserHeader', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders null if user._id is not defined', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: mockLogout,
    });
    (useFetchProfileQuery as jest.Mock).mockReturnValue({
      data: {
        fetchProfile: {
          images: ['https://example.com/profile.jpg'],
          userName: 'Test',
        },
      },
    });

    render(<UserHeader />);
  });

  it('renders header with profile image and links', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { _id: '123', name: 'Test User' },
      logout: mockLogout,
    });

    (useFetchProfileQuery as jest.Mock).mockReturnValue({
      data: {
        fetchProfile: {
          images: ['https://example.com/profile.jpg'],
          userName: 'Test',
        },
      },
    });

    render(<UserHeader />);

    expect(screen.getByTestId('header-image')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('avatar-button'));
  });

  it('shows default avatar if no profile image', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { _id: '123' },
      logout: mockLogout,
    });

    (useFetchProfileQuery as jest.Mock).mockReturnValue({
      data: {
        fetchProfile: {
          images: [],
          userName: 'Test',
        },
      },
    });

    render(<UserHeader />);

    fireEvent.click(screen.getByTestId('avatar-button'));

    await waitFor(() => {
      expect(screen.getByAltText('default avatar')).toBeInTheDocument();
    });
  });
});
