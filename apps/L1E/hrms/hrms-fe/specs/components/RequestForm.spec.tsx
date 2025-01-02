import { fireEvent, render } from '@testing-library/react';
import RequestForm from '@/components/RequestForm';
import { MockedProvider } from '@apollo/client/testing';
import { GetEmployeesDocument } from '@/generated';

jest.mock('../../src/components/requestForm/RequestFormcom', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Day Component</div>),
}));

jest.mock('../../src/components/requestForm/RequestFormPaid', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Time Component</div>),
}));

jest.mock('../../src/components/requestForm/RequestFormRemote', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Time Component</div>),
}));



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
describe('RequestForm', () => {
  it('should RequestForm', async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={[mockGetEmployees]} addTypename={false}>
      <RequestForm />
    </MockedProvider>
  );

  const select = getByTestId('select-input');
  fireEvent.keyDown(select, { key: 'ArrowDown' });

  const input1 = getByTestId('item1');
  fireEvent.keyDown(input1, { key: 'Enter'});
  });
it('should RequestForm', async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={[mockGetEmployees]} addTypename={false}>
      <RequestForm />
    </MockedProvider>
  );
  const select = getByTestId('select-input');
  fireEvent.keyDown(select, { key: 'ArrowDown' })

  const input2 = getByTestId('item2');
  fireEvent.keyDown(input2, { key: 'Enter' });
});

it('should RequestForm', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mockGetEmployees]} addTypename={false}>
        <RequestForm />
      </MockedProvider>
    );
  const select = getByTestId('select-input');
  fireEvent.keyDown(select, { key: 'ArrowDown' });

  const input2 = getByTestId('item3');
  fireEvent.keyDown(input2, { key: 'Enter' });
});


});
