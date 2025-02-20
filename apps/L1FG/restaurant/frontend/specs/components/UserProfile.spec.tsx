import { render } from '@testing-library/react';
import UserProfile from '@/components/user-profile/UserProfile';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
describe('UserProfile Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('handles localStorage get user not found, userId will be null', async () => {
    Storage.prototype.getItem = jest.fn(() => null);

    render(
      <MockedProvider>
        <UserProfile />
      </MockedProvider>
    );
  });
  it('correctly retrieves userId from localStorage and fetches orders', async () => {
    const mockUser = { _id: 'user123', profileImage: null };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUser));
    const { getByTestId } = render(
      <MockedProvider>
        <UserProfile />
      </MockedProvider>
    );
    const defaultUser = getByTestId('defaultUser');
    expect(defaultUser).toBeInTheDocument();
  });
  test('renders default user icon when profile image is not available', () => {
    const { getByTestId } = render(
      <MockedProvider>
        <UserProfile />
      </MockedProvider>
    );
    const defaultUser = getByTestId('defaultUser');

    expect(defaultUser).toBeInTheDocument();
  });

  test('renders profile image when available in localStorage', () => {
    const mockUser = {
      profileImage: 'https://example.com/profile.jpg',
      phoneNumber: '1234567890',
      email: 'test@example.com',
    };
    localStorage.setItem('user', JSON.stringify(mockUser));

    const { getByTestId } = render(
      <MockedProvider>
        <UserProfile />
      </MockedProvider>
    );

    const profileImage = getByTestId('profileImage');

    expect(profileImage).toBeInTheDocument();
  });
});
