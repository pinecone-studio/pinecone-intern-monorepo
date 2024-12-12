import { MainNavbar, useAuth } from '@/components';
import { GetMeDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render } from '@testing-library/react';
import { useTheme } from 'next-themes';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mock: MockedResponse = {
  request: {
    query: GetMeDocument,
  },
  result: {
    data: {
      getMe: {
        email: 'test@example.com',
      },
    },
  },
};
jest.mock('@/components/providers/AuthProvider', () => ({
  ...jest.requireActual('@/components/providers/AuthProvider'),
  useAuth: jest.fn(),
}));

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
  theme: 'dark',
}));

describe('MainNavbar', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'light',
      setTheme: mockSetTheme,
    }));
    (usePathname as jest.Mock).mockReturnValue('/signup');
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        email: 'test@example.com',
      },
      signout: jest.fn(),
    });
  });
  it('should render successfully', async () => {
    const mockToken = 'mocked-token';
    localStorage.setItem('token', mockToken);
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainNavbar />
      </MockedProvider>
    );
    expect(screen);
  });

  it('should click light button', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainNavbar />
      </MockedProvider>
    );
    fireEvent.click(getByTestId('dark'));
    expect(mockSetTheme);
  });
});
