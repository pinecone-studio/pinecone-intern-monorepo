'use client';
import ProfileSideBar from '@/app/(main)/_components/ProfileSideBar';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProfileSideBar', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders sidebar correctly', () => {
    render(<ProfileSideBar />);
    expect(screen.getByTestId('Profile')).toBeInTheDocument();
    expect(screen.getByTestId('Contact')).toBeInTheDocument();
    expect(screen.getByTestId('Security')).toBeInTheDocument();
  });

  it('navigates to /hotels when Hotels button is clicked', () => {
    render(<ProfileSideBar />);
    const hotelsButton = screen.getByTestId('Profile');
    fireEvent.click(hotelsButton);
    expect(hotelsButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith('/profile');
  });

  it('navigates to /guests when Guests button is clicked', () => {
    render(<ProfileSideBar />);
    const guestsButton = screen.getByTestId('Contact');
    fireEvent.click(guestsButton);
    expect(guestsButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith('/contact');
  });

  it('navigates to /guests when Guests button is clicked', () => {
    render(<ProfileSideBar />);
    const guestsButton = screen.getByTestId('Security');
    fireEvent.click(guestsButton);
    expect(guestsButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith('/security');
  });
});
