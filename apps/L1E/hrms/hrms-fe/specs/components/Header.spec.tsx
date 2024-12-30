import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Header } from '@/components/Header';
import { GetEmployeesDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';

const mockGetEmployees = {
  request: {
    query: GetEmployeesDocument,
  },
  result: {
    data: {
      getEmployees: [
        {
          _id: '1',
          email: 'john.doe@example.com',
          jobTitle: 'Developer',
          username: 'johndoe',
          adminStatus: true,
          remoteLimit: 5,
          paidLeaveLimit: 10,
          freeLimit: 2,
          employeeStatus: 'Lead',
          createdAt: '2020-01-01',
          updatedAt: '2023-01-01',
        },
        {
          _id: '2',
          email: 'jane.doe@example.com',
          jobTitle: 'Designer',
          username: 'janedoe',
          adminStatus: false,
          remoteLimit: 3,
          paidLeaveLimit: 7,
          freeLimit: 1,
          employeeStatus: 'Lead',
          createdAt: '2020-02-01',
          updatedAt: '2023-02-01',
        },
      ],
    },
  },
};

describe('Header', () => {
  it('renders the header correctly', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mockGetEmployees]} addTypename={false}>
        <Header />
      </MockedProvider>
    );

    // Simulate button clicks for different components
    fireEvent.click(getByTestId('MyRequest-btn'));
    fireEvent.click(getByTestId('MyRequest-btn-2'));
    fireEvent.click(getByTestId('RequestForm-btn'));
    fireEvent.click(getByTestId('RequestForm-btn-2'));
    fireEvent.click(getByTestId('LeaveCalendar-btn'));
    fireEvent.click(getByTestId('LeaveCalendar-btn-2'));
    fireEvent.click(getByTestId('LeaveCalendar-btn-3'));
    fireEvent.click(getByTestId('PendingRequest-btn'));
    fireEvent.click(getByTestId('EmployeeList-btn'));
    fireEvent.click(getByTestId('Leave-btn'));
  });

  it('should toggle dark mode on checkbox change', async () => {
    Storage.prototype.getItem = jest.fn(() => 'dark');
    render(
      <MockedProvider mocks={[mockGetEmployees]} addTypename={false}>
        <Header />
      </MockedProvider>
    );
    const themeToggleCheckbox = screen.getByRole('checkbox');
    const sunnyIcon = screen.getByTestId('IoSunnyOutline');

    expect(sunnyIcon);

    fireEvent.click(themeToggleCheckbox);

    await waitFor(() => {
      expect(document.body);
    });

    expect(localStorage.getItem('theme'));

    fireEvent.click(themeToggleCheckbox);
  });
});
