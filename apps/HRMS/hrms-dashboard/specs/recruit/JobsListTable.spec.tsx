import React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { JobsListTable } from '../../src/app/recruiting/_features';
import { GET_JOBS_LIMIT, GET_ALL_JOBS } from '../../src/app/recruiting/_features/query';
import { formatDateToMongolian } from '../../src/app/recruiting/_features';

const generateMockJobs = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    title: `Job ${i + 1}`,
    dueDate: '1633046400000',
    createdAt: '1633046400000',
    status: 'Open',
  }));
};

const mocks = [
  {
    request: {
      query: GET_JOBS_LIMIT,
      variables: {
        offset: 0,
        limit: 6,
      },
    },
    result: {
      data: {
        getJobsWithLimit: generateMockJobs(6),
      },
    },
  },
  {
    request: {
      query: GET_JOBS_LIMIT,
      variables: {
        offset: 6,
        limit: 6,
      },
    },
    result: {
      data: {
        getJobsWithLimit: generateMockJobs(6),
      },
    },
  },
  {
    request: {
      query: GET_ALL_JOBS,
    },
    result: {
      data: {
        getJobs: generateMockJobs(12),
      },
    },
  },
];

describe('JobsListTable', () => {
  it('renders without error', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JobsListTable />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Job 1')).toBeDefined();
    });
  });

  it('handles error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_JOBS_LIMIT,
          variables: {
            offset: 0,
            limit: 6,
          },
        },
        error: new Error('An error occurred'),
      },
    ];

    const { getByText } = render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <JobsListTable />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Error: An error occurred')).toBeDefined();
    });
  });
  it('handles page change', async () => {
    const { findByRole, getByText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JobsListTable />
      </MockedProvider>
    );

    const pagination = await findByRole('navigation', { name: /pagination/i });

    const { getByText: getByTextWithinPagination } = within(pagination);

    fireEvent.click(getByTextWithinPagination('2'));

    await waitFor(
      () => {
        expect(queryByText('Job 6')).toBeNull();
      },
      { timeout: 10000 }
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(getByText('2')).toBeDefined();
  });
  it('calculates the correct number of pages', async () => {
    const { findByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JobsListTable />
      </MockedProvider>
    );

    await findByRole('navigation', { name: /pagination/i });

    const nullJobsMock = [
      {
        request: {
          query: GET_ALL_JOBS,
        },
        result: {
          data: {
            getJobs: [],
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={nullJobsMock} addTypename={false}>
        <JobsListTable />
      </MockedProvider>
    );

    const newPagination = await findByRole('navigation', { name: /pagination/i });
    expect(within(newPagination).getAllByRole('button')).toHaveLength(4);
  });
});
describe('formatDateToMongolian', () => {
  it('formats the date correctly', () => {
    const date = new Date(2022, 0, 1);
    const result = formatDateToMongolian(date);
    expect(result).toBe('1/1 - Бямба');
  });
});
