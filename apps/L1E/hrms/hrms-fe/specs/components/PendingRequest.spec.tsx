import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PendingRequest } from '@/components/PendingRequest';
import { GetAllRequestsDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
const mockRequest = [
  {
    _id: '677249a6197305d06f1db185',
    employeeId: '676e6de507d5ae05a35cda88',
    leadEmployeeId: '676e6dec07d5ae05a35cda8a',
    requestStatus: '',
    requestType: 'PENDING',
    reason: 'remote test',
    reasonRefuse: '',
    selectedDay: '2024-12-30T16:00:00.000Z',
    startTime: '00:00',
    endTime: '24:00',
    updatedAt: 'Mon Dec 30 2024 15:20:06 GMT+0800 (Ulaanbaatar Standard Time)',
    createdAt: 'Mon Dec 30 2024 15:20:06 GMT+0800 (Ulaanbaatar Standard Time)',
  },
  {
    _id: '6772551fa009a9bf378d99eb',
    employeeId: '676e6de507d5ae05a35cda88',
    leadEmployeeId: '676e6de507d5ae05a35cda88',
    requestStatus: 'FREE',
    requestType: 'PENDING',
    reason: 'dfgadgsdfg',
    reasonRefuse: '',
    selectedDay: new Date(2024, 11, 29),
    startTime: '09:00',
    endTime: '10:00',
    updatedAt: 'Mon Dec 30 2024 16:09:03 GMT+0800 (Ulaanbaatar Standard Time)',
    createdAt: 'Mon Dec 30 2024 16:09:03 GMT+0800 (Ulaanbaatar Standard Time)',
  },
];
const mocks = [
  {
    request: {
      query: GetAllRequestsDocument,
      variables: {
        limit: 100,
      },
    },
    result: {
      data: {
        getAllRequests: mockRequest,
      },
    },
  },
];
describe('PendingRequest', () => {
  it('renders the component', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PendingRequest />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
