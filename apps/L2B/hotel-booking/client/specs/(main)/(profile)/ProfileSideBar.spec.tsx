'use client';
import ProfileSideBar from '@/app/(main)/(profiles)/_components/ProfileSideBar';
import { AuthContext } from '@/app/(main)/_context/AuthContext';
import { UserType } from '@/utils/type';
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

  const mockUser: UserType = {
    _id: '682207ae2c5870fba2e6da4c',
    email: 'testuser@example.com',
    firstName: 'Test',
    lastName: 'User',
    birth: new Date('1990-01-01'),
    phone: '123456789',
    relation: 'Friend',
    emergencyPhone: '987654321',
  };

  const renderWithAuth = () => {
    return render(
      <AuthContext.Provider value={{ user: mockUser, logout: jest.fn(), fetchUser: jest.fn() }}>
        <ProfileSideBar />
      </AuthContext.Provider>
    );
  };

  it('renders sidebar correctly', () => {
    renderWithAuth();
    expect(screen.getByTestId('Profile')).toBeInTheDocument();
    expect(screen.getByTestId('Contact')).toBeInTheDocument();
    expect(screen.getByTestId('Security')).toBeInTheDocument();
  });

  it('navigates to /profile when Profile button is clicked', () => {
    renderWithAuth();
    const profileButton = screen.getByTestId('Profile');
    fireEvent.click(profileButton);
    expect(profileButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith(`/profile?userId=${mockUser._id}`);
  });

  it('navigates to /contact when Contact button is clicked', () => {
    renderWithAuth();
    const contactButton = screen.getByTestId('Contact');
    fireEvent.click(contactButton);
    expect(contactButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith(`/contact?userId=${mockUser._id}`);
  });

  it('navigates to /security when Security button is clicked', () => {
    renderWithAuth();
    const securityButton = screen.getByTestId(`Security`);
    fireEvent.click(securityButton);
    expect(securityButton).toHaveClass('bg-[#F4F4F5]');
    expect(mockPush).toHaveBeenCalledWith(`/security?userId=${mockUser._id}`);
  });
});
