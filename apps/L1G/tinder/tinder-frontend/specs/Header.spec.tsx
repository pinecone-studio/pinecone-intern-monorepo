import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/components/Header';
import { useGetMeQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetMeQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockedUseGetMeQuery = useGetMeQuery as jest.Mock;

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders fallback profile image when loading is true', () => {
    mockedUseGetMeQuery.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<Header />);

    const profileImage = screen.getByAltText(/Profile Picture/i);
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', expect.stringContaining('profile.jpg'));
  });

  it('renders first user image when data is loaded', () => {
    const userImageUrl = 'https://example.com/avatar.png';
    mockedUseGetMeQuery.mockReturnValue({
      data: {
        getMe: {
          images: [userImageUrl],
        },
      },
      loading: false,
    });

    render(<Header />);

    const profileImage = screen.getByAltText(/Profile Picture/i);
    expect(profileImage).toHaveAttribute('src', expect.stringContaining('avatar.png'));
  });

  it('falls back to default image if user has no images', () => {
    mockedUseGetMeQuery.mockReturnValue({
      data: {
        getMe: {
          images: [],
        },
      },
      data: {
        getMe: {
          images: [],
        },
      },
      loading: false,
    });

    render(<Header />);

    const profileImage = screen.getByAltText(/Profile Picture/i);
    expect(profileImage).toHaveAttribute('src', expect.stringContaining('profile.jpg'));
  });
  it('navigates to /chat when the Messages button is clicked', () => {
    const pushMock = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.mocked(require('next/navigation')).useRouter = () => ({
      push: pushMock,
    });

    mockedUseGetMeQuery.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<Header />);

    const button = screen.getByLabelText(/Messages/i);
    button.click();

    expect(pushMock).toHaveBeenCalledWith('/chat');
  });
});
