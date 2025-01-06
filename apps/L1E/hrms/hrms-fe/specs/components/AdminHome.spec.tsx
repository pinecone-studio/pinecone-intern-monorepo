import AdminHome from '@/components/admindashboard/AdminHome';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { EmployeeStatus, GetEmployeesDocument } from '@/generated';

const mockLeads = {
  getEmployees: [
    {
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
  ],
};

const createRequestMock = {
  request: {
    query: GetEmployeesDocument,
    variables: { input: 'Lead' },
  },
  result: {
    data: mockLeads,
  },
};

describe('PaidLeave Component', () => {
  it('renders the component', async () => {
    render(
      <MockedProvider mocks={[createRequestMock]} addTypename={false}>
        <AdminHome />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });
});
