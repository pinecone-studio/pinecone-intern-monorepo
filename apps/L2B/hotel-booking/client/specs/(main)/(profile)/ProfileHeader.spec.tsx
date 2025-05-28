import { ProfileHeader } from '@/app/(main)/(profiles)/_components/ProfileHeader';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthContext } from '@/app/(main)/_context/AuthContext';
import { UserType } from '@/utils/type';

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

const renderWithProviders = () => {
  return render(
    <AuthContext.Provider value={{ user: mockUser, logout: jest.fn(), fetchUser: jest.fn() }}>
      <ProfileHeader />
    </AuthContext.Provider>
  );
};

describe('ProfileHeader', () => {
  it('renders user email from useAuth', async () => {
    renderWithProviders();

    expect(screen.getByText('Hi,Test')).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });
});
