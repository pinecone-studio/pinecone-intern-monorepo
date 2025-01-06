import { RemoteWork } from '@/components/RemoteWork';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmployeeStatus, GetEmployeeByIdDocument } from '@/generated';
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
const mockLeads1 = {
  getEmployeeById: {
    _id: '676e6e4007d5ae05a35cda9e',
    adminStatus: true,
    email: 'lead1@example.com',
    employeeStatus: EmployeeStatus.Lead,
    freeLimit: 10,
    jobTitle: 'Lead Developer',
    paidLeaveLimit: 0,
    remoteLimit: 0,
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
const createRequestMock1 = {
  request: {
    query: GetEmployeeByIdDocument,
    variables: { getEmployeeByIdId: '676e6e4007d5ae05a35cda9e' },
  },
  result: {
    data: mockLeads1,
  },
};

describe('RemoteWork', () => {
  it('renders the component', async () => {
    render(
      <MockedProvider mocks={[createRequestMock]} addTypename={false}>
        <RemoteWork availableDays={3} totalRemoteDays={5} />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });
  it('renders the component', async () => {
    render(
      <MockedProvider mocks={[createRequestMock1]} addTypename={false}>
        <RemoteWork availableDays={3} totalRemoteDays={5} />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });
});
