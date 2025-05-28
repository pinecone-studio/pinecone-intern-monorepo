import { render, screen } from '@testing-library/react';
import { HeaderAuth } from '@/app/_components/HeaderAuth';
import { AuthContext } from '@/app/(main)/_context/AuthContext';
import '@testing-library/jest-dom';

describe('HeaderAuth', () => {
  const renderWithAuth = (user: any, bg: 'white' | 'blue' = 'white') => {
    return render(
      <AuthContext.Provider value={{ user, logout: jest.fn(), fetchUser: jest.fn() }}>
        <HeaderAuth bg={bg} user={user} />
      </AuthContext.Provider>
    );
  };

  it('renders auth links if user is null', () => {
    renderWithAuth(null, 'white');
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('renders user name and "My Booking" if user is logged in', () => {
    const user = { firstName: 'Alice' };
    renderWithAuth(user, 'blue');
    expect(screen.getByText(/my booking/i)).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders "My Profile" if firstName is not provided', async () => {
    const user = { id: '456' };
    renderWithAuth(user);

    expect(screen.getByText(/my profile/i)).toBeInTheDocument();
  });
});
