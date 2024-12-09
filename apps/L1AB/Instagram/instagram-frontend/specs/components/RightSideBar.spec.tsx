import { render, screen, fireEvent } from '@testing-library/react';
import RightSideBar from '@/components/RightSideBar';
import { UserContext } from '@/components/providers/UserProvider';
import LogoutDialog from '@/components/LogoutButton';

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      reload: jest.fn(),
    },
  });
});

describe('RightSideBar', () => {
  const mockUser = {
    _id: '134124',
    email: '123@gmail.com',
    username: 'blabla',
    fullname: 'blabla',
    gender: 'blabla',
    password: 'blabla',
    profilePicture: 'blabla',
    bio: 'blabla',
    isPrivate: false,
    createdAt: 'blabla',
    updatedAt: 'blabla',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the user information correctly', () => {
    render(
      <UserContext.Provider value={{ user: mockUser, users: mockUser }}>
        <RightSideBar />
      </UserContext.Provider>
    );
  });

  test('logs the user out when the logout button is clicked', () => {
    localStorage.setItem('userToken', 'some-token');
    render(
      <UserContext.Provider value={{ user: mockUser, users: mockUser }}>
        <RightSideBar />
      </UserContext.Provider>
    );

    const dialogButton = screen.getByTestId('btn-logout');
    fireEvent.click(dialogButton);
    render(<LogoutDialog />);
    const LogOutButton = screen.getByTestId('log-out-button');
    fireEvent.click(LogOutButton);
    expect(localStorage.removeItem('userToken'));
    expect(window.location.reload);
  });
});
