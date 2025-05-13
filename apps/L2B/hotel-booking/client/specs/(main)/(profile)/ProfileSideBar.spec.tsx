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

  it('navigates to /profile when Profile button is clicked', () => {
    render(<ProfileSideBar />);
    const profileButton = screen.getByTestId('Profile');
    fireEvent.click(profileButton);
    expect(profileButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith('/profile');
  });

  it('navigates to /contact when Contact button is clicked', () => {
    render(<ProfileSideBar />);
    const contactButton = screen.getByText('Contact');
    fireEvent.click(contactButton);
    expect(contactButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith('/contact');
  });

  it('navigates to /security when Security button is clicked', () => {
    render(<ProfileSideBar />);
    const securityButton = screen.getByText('Security');
    fireEvent.click(securityButton);
    expect(securityButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith('/security');
  });
});
