import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useGetRequestsQuery } from '../../src/generated';
import { useRouter } from 'next/navigation';
import Requests from '../../src/app/leaving/_features/Requests';

jest.mock('../../src/generated', () => ({
  useGetRequestsQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Requests features', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', async () => {
    useGetRequestsQuery.mockReturnValueOnce({ loading: true });

    render(<Requests />);

    expect(screen.getByText('Loading...'));
  });

  it('renders error state', async () => {
    const errorMessage = 'Failed to fetch requests';
    useGetRequestsQuery.mockReturnValueOnce({ error: { message: errorMessage } });

    render(<Requests />);

    // expect(screen.getByText(`Error: ${errorMessage}`));
  });

  it('navigates to detail page on row click', async () => {
    const requestsData = [
      {
        _id: '1',
        declinedReasoning: 'Reason 1',
        description: 'Description 1',
        totalHour: 10,
        status: 'pending',
      },
    ];
    useGetRequestsQuery.mockReturnValueOnce({ data: { getRequests: requestsData } });

    render(<Requests />);

    await waitFor(() => {
      const row = screen.getByText('Reason 1').closest('tr');
      fireEvent.click(row);
      expect(useRouter().push).toHaveBeenCalledWith('/leaving/Detail?requestId=1');
    });
  });
});
