import React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ApplicantsListTable } from '../../src/app/recruiting/_features';
import { GET_ALL_APPLICANTS, GET_APPLICANTS_LIMIT } from '../../src/app/recruiting/_features/query';

const generateMockApplicants = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    firstname: `Applicant ${i + 1}`,
    lastname: 'Lastname',
    status: 'PENDING',
    email: 'test@gmail.com',
  }));
};

const mocks = [
  {
    request: {
      query: GET_APPLICANTS_LIMIT,
      variables: {
        offset: 0,
        limit: 6,
      },
    },
    result: {
      data: {
        getApplicantWithLimit: generateMockApplicants(6),
      },
    },
  },
  {
    request: {
      query: GET_APPLICANTS_LIMIT,
      variables: {
        offset: 6,
        limit: 6,
      },
    },
    result: {
      data: {
        getApplicantWithLimit: generateMockApplicants(6),
      },
    },
  },
  {
    request: {
      query: GET_ALL_APPLICANTS,
    },
    result: {
      data: {
        getApplicants: generateMockApplicants(12),
      },
    },
  },
];

describe('ApplicantsListTable', () => {
  it('renders without error', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApplicantsListTable />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Applicant 1')).toBeDefined();
    });
  });

  it('handles error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_APPLICANTS_LIMIT,
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
        <ApplicantsListTable />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Error: An error occurred')).toBeDefined();
    });
  });
  it('handles page change', async () => {
    const { findByRole, getByText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApplicantsListTable />
      </MockedProvider>
    );

    const pagination = await findByRole('navigation', { name: /pagination/i });

    const { getByText: getByTextWithinPagination } = within(pagination);

    fireEvent.click(getByTextWithinPagination('2'));

    await waitFor(
      () => {
        expect(queryByText('Applicant 6')).toBeNull();
      },
      { timeout: 10000 }
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(getByText('2')).toBeDefined();
  });
  it('calculates the correct number of pages', async () => {
    const { findByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApplicantsListTable />
      </MockedProvider>
    );

    await findByRole('navigation', { name: /pagination/i });

    const nullJobsMock = [
      {
        request: {
          query: GET_ALL_APPLICANTS,
        },
        result: {
          data: {
            getApplicants: [],
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={nullJobsMock} addTypename={false}>
        <ApplicantsListTable />
      </MockedProvider>
    );

    const newPagination = await findByRole('navigation', { name: /pagination/i });
    expect(within(newPagination).getAllByRole('button')).toHaveLength(4);
  });
});
