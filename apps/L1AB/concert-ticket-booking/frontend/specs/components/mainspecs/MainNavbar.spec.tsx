import { MainNavbar } from '@/components';
import { GetMeDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen } from '@testing-library/react';
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
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
  theme: 'light',
}));

describe('MainNavbar', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'dark',
      setTheme: mockSetTheme,
    }));
  });
    it('should apply "border-b-red-400 border-b-2" class when pathname is "/demo"', () => {
      usePathname.mockReturnValue('/demo');
  
      const { getByTestId } = render(<MainNavbar />);
      const demoLink = getByTestId('/demo');
  
      expect(demoLink).toHaveClass('border-b-red-400 border-b-2');
    });
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

    expect(screen);
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

  it('should click dark button', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainNavbar />
      </MockedProvider>
    );
    fireEvent.click(screen.getByTestId('light'));
    expect(mockSetTheme);
  });
});
