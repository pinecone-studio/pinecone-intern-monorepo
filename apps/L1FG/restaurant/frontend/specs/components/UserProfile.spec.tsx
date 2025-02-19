import { render } from '@testing-library/react';
import UserProfile from '@/components/user-profile/UserProfile';
import { MockedProvider } from '@apollo/client/testing';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

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
    const mockUser = { _id: 'user123' };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUser));
    render(
      <MockedProvider>
        <UserProfile />
      </MockedProvider>
    );
  });
});
