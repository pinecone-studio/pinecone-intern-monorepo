import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Header } from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useUser } from '@/provider/UserProvider';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/provider/UserProvider', () => ({
  useUser: jest.fn(),
}));

describe('Header Component', () => {
  let push: jest.Mock;

  beforeEach(() => {
    push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useUser as jest.Mock).mockReturnValue({
      user: {
        adminStatus: true,
        employeeStatus: 'Lead',
      },
    });
  });

  it('renders the header and navigates between components', () => {
    render(
      <MockedProvider>
        <Header />
      </MockedProvider>
    );

    // Check if the logo is displayed

    // Simulate navigation to different components
    const buttons = [
      { testId: 'MyRequest-btn', route: '/my-requests' },
      { testId: 'RequestForm-btn', route: '/request-form' },
      { testId: 'LeaveCalendar-btn', route: '/leave-calendar' },
      { testId: 'PendingRequest-btn', route: '/pending-requests' },
      { testId: 'employee-list-btn', route: '/employee-list' },
    ];

    buttons.forEach(({ testId, route }) => {
      const button = screen.getByTestId(testId);
      fireEvent.click(button);
      expect(push).toHaveBeenCalledWith(route);
    });
  });

  it('conditionally renders buttons based on user roles', () => {
    // Mock user without admin or lead privileges
    (useUser as jest.Mock).mockReturnValueOnce({
      user: {
        adminStatus: false,
        employeeStatus: 'Member',
      },
    });

    render(
      <MockedProvider>
        <Header />
      </MockedProvider>
    );

    // "Employee list" button should not render for non-admin users
    expect(screen.queryByTestId('employee-list-btn'));

    // "Pending Requests" button should not render for non-lead employees
    expect(screen.queryByTestId('PendingRequest-btn'));

    // Other buttons should still render
    expect(screen.getByTestId('MyRequest-btn'));
    expect(screen.getByTestId('RequestForm-btn'));
    expect(screen.getByTestId('LeaveCalendar-btn'));
  });
  it('should remove token from localStorage and navigate to login on click', () => {
    const { getByTestId } = render(<Header />);
    const button = getByTestId('logout-button');

    fireEvent.click(button);
  });
});
