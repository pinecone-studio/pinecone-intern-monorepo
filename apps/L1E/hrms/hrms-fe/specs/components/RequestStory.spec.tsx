import { render, fireEvent, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetRequestsByEmployeeDocument } from '@/generated';
import RequestStory from '@/components/RequestStory';

const mockGetRequestByEmployee = {
  request: {
    query: GetRequestsByEmployeeDocument,
    variables: { employeeId: '676e6e4007d5ae05a35cda9e' },
  },
  result: {
    data: {
      getRequestsByEmployee: [
        {
          _id: '67724947197305d06f1db179',
          employeeId: '676e6e4007d5ae05a35cda9e',
          leadEmployeeId: '676e6dd407d5ae05a35cda84',
          requestStatus: 'FREE',
          requestType: 'PENDING',
          selectedDay: new Date(2024, 11, 29),
          reason: 'time test',
          reasonRefuse: '',
          startTime: '08:00',
          endTime: '14:00',
          updatedAt: 'Mon Dec 30 2024 15:18:31 GMT+0800 (Ulaanbaatar Standard Time)',
          createdAt: 'Mon Dec 30 2024 15:18:31 GMT+0800 (Ulaanbaatar Standard Time)',
        },
        {
          _id: '67724947197305d06f1db179',
          employeeId: '676e6e4007d5ae05a35cda9e',
          leadEmployeeId: '676e6dd407d5ae05a35cda84',
          requestStatus: 'FREE',
          requestType: 'PENDING',
          selectedDay: new Date(2024, 11, 29),
          reason: 'time test',
          reasonRefuse: '',
          startTime: '08:00',
          endTime: '14:00',
          updatedAt: 'Mon Dec 30 2024 15:18:31 GMT+0800 (Ulaanbaatar Standard Time)',
          createdAt: 'Mon Dec 30 2024 15:18:31 GMT+0800 (Ulaanbaatar Standard Time)',
        },
      ],
    },
  },
};
beforeAll(() => {
  const mockDate = new Date(2024, 11, 29);
  global.Date = jest.fn(() => mockDate) as unknown as DateConstructor;
});

afterAll(() => {
  jest.restoreAllMocks();
});
describe('RequestStory Component', () => {
  it('renders the component and matches snapshot', async () => {
    render(
      <MockedProvider mocks={[mockGetRequestByEmployee]} addTypename={false}>
        <RequestStory />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
  it('renders the component', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mockGetRequestByEmployee]} addTypename={false}>
        <RequestStory />
      </MockedProvider>
    );
    const btn = getByTestId('btn');
    await act(async () => {
      fireEvent.click(btn);
    });
  });
});
