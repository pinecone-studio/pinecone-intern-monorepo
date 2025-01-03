import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmployeeStatus, GetEmployeeByIdDocument } from '@/generated';
import { MyRequest } from '@/components/MyRequest';
import { MockedProvider } from '@apollo/client/testing';

const mockLeads = {
  getEmployeeById: {
    _id: '676e6e4007d5ae05a35cda9e',
    adminStatus: true,
    email: 'lead1@example.com',
    employeeStatus: EmployeeStatus.Lead,
    freeLimit: 10,
    jobTitle: 'Lead Developer',
    paidLeaveLimit: 5,
    remoteLimit: 5,
    username: 'Lead 1',
    createdAt: '2023-01-01',
    updatedAt: '2023-06-01',
  },
};

const createRequestMock = {
  request: {
    query: GetEmployeeByIdDocument,
    variables: { getEmployeeByIdId: '676e6e4007d5ae05a35cda9e' },
  },
  result: {
    data: mockLeads,
  },
};

describe('MyRequest', () => {
  it('renders the component success', () => {
    render(
      <MockedProvider mocks={[createRequestMock]} addTypename={false}>
        <MyRequest />
      </MockedProvider>
    );
    expect(screen.getByText('Миний явуулсан хүсэлтүүд:'));
  });
  it('renders the component failed', () => {
    render(
      <MockedProvider mocks={[createRequestMock]} addTypename={false}>
        <MyRequest />
      </MockedProvider>
    );
    expect(screen.getByText('Миний явуулсан хүсэлтүүд:'));
  });
});
