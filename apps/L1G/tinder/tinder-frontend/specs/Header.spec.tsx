import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/components/Header';
import { useGetMeQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetMeQuery: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
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
    mockedUseGetMeQuery.mockReturnValue({
      data: {
        getMe: {
          images: ['https://example.com/avatar.png'],
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
    mockedUseGetMeQuery.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<Header />);
    const button = screen.getByLabelText(/Messages/i);
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/chat');
  });

  it('navigates to /profile when profile image button is clicked', () => {
    mockedUseGetMeQuery.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<Header />);
    const profileButton = screen.getByAltText(/Profile Picture/i).closest('button');
    fireEvent.click(profileButton!);
    expect(mockPush).toHaveBeenCalledWith('/profile');
  });
});
