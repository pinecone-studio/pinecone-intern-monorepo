import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Header } from '@/components/Header';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/provider/UserProvider';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('@/provider/UserProvider', () => ({
  useUser: jest.fn(),
}));

describe('Header Component', () => {
  const buttons = [
    { testId: '/my-requests', route: '/my-requests' },
    { testId: 'PendingRequest-btn', route: '/pending-requests' },
    { testId: 'employee-list-btn', route: '/employee-list' },
  ];

  let push: jest.Mock;

  beforeEach(() => {
    push = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push,
    });

    (usePathname as jest.Mock).mockReturnValueOnce('/my-requests').mockReturnValueOnce('/pending-requests').mockReturnValueOnce('/employee-list');
    (useUser as jest.Mock).mockReturnValue({
      user: {
        adminStatus: true,
        employeeStatus: 'Lead',
      },
    });
  });

  it('renders the header and navigates between components', () => {
    const { getByTestId } = render(
      <MockedProvider>
        <Header />
      </MockedProvider>
    );

    buttons.forEach(({ testId }) => {
      const button = getByTestId(testId);
      fireEvent.click(button);
    });
  });

  it('should remove token from localStorage and navigate to login on click', () => {
    const { getByTestId } = render(<Header />);
    const button = getByTestId('logout-button');

    fireEvent.click(button);

    const rejectBtn = getByTestId('reject-modal');

    fireEvent.click(rejectBtn);
  });
  it('should remove token from localStorage and navigate to login on click', () => {
    const { getByTestId } = render(<Header />);
    const button = getByTestId('logout-button');

    fireEvent.click(button);

    const approveBtn = getByTestId('approve-modal');

    fireEvent.click(approveBtn);
  });
});
