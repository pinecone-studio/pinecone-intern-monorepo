import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../client/src/app/(main)/_context/AuthContext';
import Header from '@/app/_components/Header';
import '@testing-library/jest-dom';

const mockUser = {
  firstName: 'John',
};

const renderHeader = (user: any = null, bg: 'white' | 'blue' = 'white') => {
  return render(
    <AuthContext.Provider value={{ user, logout: jest.fn(), fetchUser: jest.fn() }}>
      <Header bg={bg} />
    </AuthContext.Provider>
  );
};

describe('Header', () => {
  it('renders with white background', () => {
    renderHeader(null, 'white');
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('bg-white');
  });

  it('renders with blue background', () => {
    renderHeader(null, 'blue');
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('bg-[#013B94]');
  });

  it('shows "Register" and "Sign in" when user is not logged in', () => {
    renderHeader();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('shows user name and "My Booking" when user is logged in', () => {
    renderHeader(mockUser);
    expect(screen.getByText('My Booking')).toBeInTheDocument();
    expect(screen.getByText(mockUser.firstName)).toBeInTheDocument();
  });
});
