import { MainNavbar } from '@/components';
import { GetMeDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render } from '@testing-library/react';
import { useTheme } from 'next-themes';
import '@testing-library/jest-dom';

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
  });
  it('should render successfully', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MainNavbar />
      </MockedProvider>
    );
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
