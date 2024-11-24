import { render, screen, fireEvent } from '@testing-library/react';
import RightSideBar from '@/components/RightSideBar';
import { userContext } from '../../src/app/(main)/layout';

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
      <userContext.Provider value={{ user: mockUser, users: mockUser }}>
        <RightSideBar />
      </userContext.Provider>
    );
  });

  test('logs the user out when the logout button is clicked', () => {
    localStorage.setItem('userToken', 'some-token');
    render(
      <userContext.Provider value={{ user: mockUser, users: mockUser }}>
        <RightSideBar />
      </userContext.Provider>
    );

    const logoutButton = screen.getByTestId('btn-logout');
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('userToken'));
    expect(window.location.reload);
  });
});
