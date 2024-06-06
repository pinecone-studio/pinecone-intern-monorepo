import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { JobDetail } from '../../src/app/recruiting/_components';
import { useRouter, useParams } from 'next/navigation';
import { MockedProvider } from '@apollo/client/testing';
import { GET_JOBS } from '../../src/app/recruiting/_components/job-detail/query/get-jobs-query';
import { DELETE_JOB } from '../../src/app/recruiting/_components/job-detail/mutations/delete-job-mutation';

const useRouterMock = useRouter as jest.Mock;
const useParamsMock = useParams as jest.Mock;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: GET_JOBS,
    },
    result: {
      data: {
        getJobs: [
          {
            id: '1',
            title: 'Job Title',
            description: 'Job Description',
            requirements: {
              others: 'Job Requirements',
            },
            minSalary: '1000',
            maxSalary: '2000',
          },
        ],
      },
    },
  },
  {
    request: {
      query: DELETE_JOB,
      variables: {
        deleteJobId: '1',
      },
    },
    result: {
      data: {
        deleteJob: {
          id: '1',
          _typename: 'Job',
        },
      },
    },
  },
];

describe('JobDetail', () => {
  it('renders without error', async () => {
    useParamsMock.mockReturnValue({ id: '1' });
    useRouterMock.mockReturnValue({
      push: jest.fn(),
    });

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JobDetail />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('modal-button')).toBeDefined();
      expect(getByTestId('edit-button')).toBeDefined();
      expect(getByTestId('back-button')).toBeDefined();
    });
  });
  it('navigates back when back button is clicked', async () => {
    useParamsMock.mockReturnValue({ id: '1' });
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({
      push: pushMock,
    });

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JobDetail />
      </MockedProvider>
    );

    await waitFor(() => {
      fireEvent.click(getByTestId('back-button'));
    });

    expect(pushMock).toHaveBeenCalledWith('/recruiting');
  });

  it('navigates to edit page when edit button is clicked', async () => {
    useParamsMock.mockReturnValue({ id: '1' });
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({
      push: pushMock,
    });

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JobDetail />
      </MockedProvider>
    );

    await waitFor(() => {
      fireEvent.click(getByTestId('edit-button'));
    });

    expect(pushMock).toHaveBeenCalledWith('/recruiting/edit-job/1');
  });
  it('deletes job and navigates back when delete button is clicked', async () => {
    useParamsMock.mockReturnValue({ id: '1' });
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({
      push: pushMock,
    });

    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <JobDetail />
      </MockedProvider>
    );

    await waitFor(async () => {
      const deleteButton = await findByText('Устгах');
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/recruiting');
    });
  });
});
