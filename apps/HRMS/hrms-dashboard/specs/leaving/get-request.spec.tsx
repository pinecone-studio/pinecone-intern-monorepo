import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import Requests from '../../src/app/leaving/_features/Requests';
import { useGetRequestsQuery } from '../../src/generated/index';

const mockData = {
  getRequests: [
    {
      _id: '1',
      declinedReasoning: 'Reason 1',
      description: 'Description 1',
      totalHour: 5,
      status: 'APPROVED',
    },
    {
      _id: '2',
      declinedReasoning: 'Reason 2',
      description: 'Description 2',
      totalHour: 10,
      status: 'DECLINED',
    },
  ],
};

jest.mock('../../src/generated/index', () => ({
  __esModule: true,
  useGetRequestsQuery: jest.fn(),
}));

describe('Requests component', () => {
  beforeEach(() => {
    useGetRequestsQuery.mockReset();
  });

  it('renders loading state correctly', () => {
    useGetRequestsQuery.mockReturnValueOnce({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <MockedProvider>
        <Requests />
      </MockedProvider>
    );
  });

  it('renders error state correctly', async () => {
    useGetRequestsQuery.mockReturnValueOnce({
      data: null,
      loading: false,
      error: new Error('error fetch data'),
    });
    const { getByText } = render(<Requests />);
    expect(getByText('Error: error fetch data'));
  });

  it('renders data correctly', async () => {
    useGetRequestsQuery.mockReturnValueOnce({
      data: mockData,
      loading: false,
      error: null,
    });

    render(
      <MockedProvider>
        <Requests />
      </MockedProvider>
    );
  });
});
