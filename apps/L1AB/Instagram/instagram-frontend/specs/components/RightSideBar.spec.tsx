import RightSideBar from '@/components/RightSideBar';
import { render, screen, fireEvent } from '@testing-library/react';
import { useGetAllUsersQuery } from '@/generated';
import '@testing-library/jest-dom';

jest.mock('@/generated', () => ({
  useGetAllUsersQuery: jest.fn(),
}));


describe('RightSideBar', () => {

beforeEach(() => {
  // Mock localStorage
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn().mockReturnValue("userToken"),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    },
    writable: true,
  });

  jest.clearAllMocks();
});
  it('should display logged-in user data when username is available', () => {
    useGetAllUsersQuery.mockReturnValue({
      data: {
        getAllUsers: [
          { username: 'john_doe', fullname: 'John Doe' },
        ],
      },
    });
    localStorage.getItem.mockReturnValue(
      'header.' + btoa(JSON.stringify({ _doc: { username: 'john_doe' } })) + '.signature'
    );

    render(<RightSideBar />);

    expect(screen.getByTestId('username')).toHaveTextContent('john_doe');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should display logged-in user data when email is available', () => {
    useGetAllUsersQuery.mockReturnValue({
      data: {
        getAllUsers: [
          { email: 'john_doe@example.com', fullname: 'John Doe' },
        ],
      },
    });
    localStorage.getItem.mockReturnValue(
      'header.' + btoa(JSON.stringify({ _doc: { email: 'john_doe@example.com' } })) + '.signature'
    );

    render(<RightSideBar />);

    expect(screen.getByTestId('username')).toHaveTextContent('john_doe@example.com');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should display "No user logged in" when no users are found', () => {
    useGetAllUsersQuery.mockReturnValue({
      data: { getAllUsers: [] },
    });
    localStorage.getItem.mockReturnValue('mocked-jwt-token');

    render(<RightSideBar />);

   expect( screen.getByTestId("no-logged-user-desc")).toBeInTheDocument()
  });

  it('should handle missing or empty getAllUsers gracefully', () => {
    useGetAllUsersQuery.mockReturnValue({
      data: { getAllUsers: [] },
    });
    localStorage.getItem.mockReturnValue(
      'header.' + btoa(JSON.stringify({ _doc: { username: 'john_doe' } })) + '.signature'
    );

    render(<RightSideBar />);

   expect( screen.getByTestId("no-logged-user-desc")).toBeInTheDocument()
  });

  it('should handle when no user is found in getAllUsers', () => {
    useGetAllUsersQuery.mockReturnValue({
      data: {
        getAllUsers: [
          { username: 'jane_doe', fullname: 'Jane Doe' },
        ],
      },
    });
    localStorage.getItem.mockReturnValue(
      'header.' + btoa(JSON.stringify({ _doc: { username: 'john_doe' } })) + '.signature'
    );

    render(<RightSideBar />);

   expect( screen.getByTestId("no-logged-user-desc")).toBeInTheDocument()
  });

  it('should log out the user when the logout button is clicked', async () => {
    useGetAllUsersQuery.mockReturnValue({
      data: {
        getAllUsers: [
          { username: 'john_doe', fullname: 'John Doe' },
        ],
      },
    });
    localStorage.getItem.mockReturnValue(
      'header.' + btoa(JSON.stringify({ _doc: { username: 'john_doe' } })) + '.signature'
    );

    render(<RightSideBar />);

    const logoutButton = screen.getByTestId('btn-logout')
    fireEvent.click(logoutButton);
    expect(localStorage.removeItem).toHaveBeenCalledWith('userToken');
  });

  it('should handle invalid token gracefully', () => {
    localStorage.getItem.mockReturnValue('header.invalidPayload.signature');
    useGetAllUsersQuery.mockReturnValue({ data: { getAllUsers: [] } });

    render(<RightSideBar />);

    expect(localStorage.getItem).toHaveBeenCalledWith('userToken');
   expect( screen.getByTestId("no-logged-user-desc")).toBeInTheDocument()
  });

  it('should handle no token in localStorage gracefully', () => {
    localStorage.getItem.mockReturnValue(null);
    useGetAllUsersQuery.mockReturnValue({ data: { getAllUsers: [] } });

    render(<RightSideBar />);

   expect( screen.getByTestId("no-logged-user-desc")).toBeInTheDocument()
  });

  it('should handle invalid token structure gracefully', () => {
    localStorage.getItem.mockReturnValue('header.invalidPayload.signature');
    useGetAllUsersQuery.mockReturnValue({ data: { getAllUsers: [] } });

    render(<RightSideBar />);

    expect(localStorage.getItem).toHaveBeenCalledWith('userToken');
   expect( screen.getByTestId("no-logged-user-desc")).toBeInTheDocument()
  });
});
