import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RequestStory from '@/components/RequestStory';
import { EmployeeStatus, GetRequestsByEmployeeQuery, RequestStatus, RequestType } from '@/generated';

describe('RequestStory Component', () => {
  const mockSetDate = jest.fn();

  const mockRequestsData: GetRequestsByEmployeeQuery = {
    getRequestsByEmployee: [
      {
        __typename: 'Request',
        _id: 'req12345',
        requestStatus: RequestStatus.Free,
        requestType: RequestType.Approved,
        selectedDay: '2025-01-05T00:00:00.000Z',
        reason: 'Personal reason',
        reasonRefuse: null,
        startTime: '2025-01-05T09:00:00.000Z',
        endTime: '2025-01-05T17:00:00.000Z',
        updatedAt: '2025-01-05T10:00:00.000Z',
        createdAt: '2025-01-03T08:00:00.000Z',
        employeeId: {
          __typename: 'Employee',
          _id: 'emp12345',
          email: 'john.doe@example.com',
          jobTitle: 'Software Engineer',
          username: 'johndoe',
          adminStatus: false,
          remoteLimit: 10,
          paidLeaveLimit: 5,
          freeLimit: 3,
          employeeStatus: EmployeeStatus.Employee,
          updatedAt: '2025-01-01T12:00:00.000Z',
          createdAt: '2024-01-01T12:00:00.000Z',
        },
        leadEmployeeId: null,
      },
      {
        __typename: 'Request',
        _id: 'req67890',
        requestStatus: RequestStatus.Free,
        requestType: RequestType.Approved,
        selectedDay: '2025-01-06T00:00:00.000Z',
        reason: 'Family emergency',
        reasonRefuse: null,
        startTime: '2025-01-06T09:00:00.000Z',
        endTime: '2025-01-06T17:00:00.000Z',
        updatedAt: '2025-01-05T10:00:00.000Z',
        createdAt: '2025-01-04T08:00:00.000Z',
        employeeId: {
          __typename: 'Employee',
          _id: 'emp12345',
          email: 'john.doe@example.com',
          jobTitle: 'Software Engineer',
          username: 'johndoe',
          adminStatus: false,
          remoteLimit: 10,
          paidLeaveLimit: 5,
          freeLimit: 3,
          employeeStatus: EmployeeStatus.Employee,
          updatedAt: '2025-01-01T12:00:00.000Z',
          createdAt: '2024-01-01T12:00:00.000Z',
        },
        leadEmployeeId: {
          __typename: 'Employee',
          _id: 'emp67890',
          email: 'jane.smith@example.com',
          jobTitle: 'Team Lead',
          username: 'janesmith',
          adminStatus: true,
          remoteLimit: 20,
          paidLeaveLimit: 10,
          freeLimit: 5,
          employeeStatus: EmployeeStatus.Lead,
          updatedAt: '2025-01-01T12:00:00.000Z',
          createdAt: '2024-01-01T12:00:00.000Z',
        },
      },
    ],
  };

  const mockDaysArray = [new Date('2025-01-04'), new Date('2025-01-05')];

  it('renders without crashing', () => {
    render(<RequestStory setDate={mockSetDate} date={{ from: new Date('2025-01-01'), to: new Date('2025-01-05') }} daysArray={mockDaysArray} requestsData={mockRequestsData} />);

    expect(screen.getByTestId('date-range-picker'));
  });

  it('resets the date when reset button is clicked', () => {
    render(<RequestStory setDate={mockSetDate} date={undefined} daysArray={mockDaysArray} requestsData={mockRequestsData} />);

    const resetButton = screen.getByTestId('btn');
    fireEvent.click(resetButton);

    expect(mockSetDate);
  });

  it('displays requests correctly', () => {
    render(<RequestStory setDate={mockSetDate} date={{ from: new Date('2025-01-01'), to: new Date('2025-01-05') }} daysArray={mockDaysArray} requestsData={mockRequestsData} />);
  });

  it('handles empty requestsData gracefully', () => {
    render(<RequestStory setDate={mockSetDate} date={{ from: new Date('2025-01-01'), to: new Date('2025-01-05') }} daysArray={mockDaysArray} requestsData={undefined} />);

    expect(screen.queryByText('Чөлөө'));
    expect(screen.queryByText('Цалинтай чөлөө'));
  });
});
