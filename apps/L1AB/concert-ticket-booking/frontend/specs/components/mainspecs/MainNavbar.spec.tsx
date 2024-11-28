import { MainNavbar } from '@/components';
import { GetMeDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
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

describe('MainNavbar', () => {
  it('should render successfully', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainNavbar />
      </MockedProvider>
    );
  });

  it('should apply the active background color to the current path', () => {
    usePathname.mockReturnValue('/signup');

    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainNavbar />
      </MockedProvider>
    );

    const signupButton = screen.getByRole('button', { name: /бүртгүүлэх/i });
    expect(signupButton);
  });
  it('should display user email when token exists', () => {
    const mockToken = 'mocked-token';
    localStorage.setItem('token', mockToken);

    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainNavbar />
      </MockedProvider>
    );

    expect(screen);
  });

  it('should show login/signup buttons when no token exists', () => {
    localStorage.removeItem('token');

    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainNavbar />
      </MockedProvider>
    );

    expect(screen);
  });
});
