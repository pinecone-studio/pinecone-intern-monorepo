import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { JobsListTable } from '../../src/app/recruiting/_features';
import { useGetJobsQuery } from '../../src/generated';

jest.mock('../../src/generated', () => ({
  useGetJobsQuery: jest.fn(),
}));

const mockUseGetJobsQuery = useGetJobsQuery as jest.MockedFunction<typeof useGetJobsQuery>;

describe('JobsListTable', () => {
  it('should render loading state correctly', () => {
    mockUseGetJobsQuery.mockReturnValue({
      data: undefined,
      loading: true,
    });

    render(<JobsListTable />);

    expect(screen.getByTestId('loading-indicator')).toBeDefined();
  });

  it('should render job data correctly', async () => {
    const jobsData = [
      { title: 'Job 1', dueDate: '1629888000000', createdAt: '1629206400000', status: 'Open' },
      { title: 'Job 2', dueDate: '1630000000000', createdAt: '1629116400000', status: 'Closed' },
    ];

    mockUseGetJobsQuery.mockReturnValue({
      data: { getJobs: jobsData },
      loading: false,
    });

    render(<JobsListTable />);

    await waitFor(() => {
      jobsData.forEach((job) => {
        expect(screen.getByText(job.title)).toBeDefined();
      });
    });
  });
});
