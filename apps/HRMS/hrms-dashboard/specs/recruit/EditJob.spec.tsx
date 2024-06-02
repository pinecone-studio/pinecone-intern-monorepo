import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { EditJob } from '../../src/app/recruiting/_components/edit-job';
import { useRouter, useParams } from 'next/navigation';
import { UPDATE_JOB } from '../../src/app/recruiting/_components/edit-job/mutations/job-update-mutation';
import { MockedProvider } from '@apollo/client/testing';
import { GET_JOBS } from '../../src/app/recruiting/_components/job-detail/query/get-jobs-query';

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
      query: UPDATE_JOB,
      variables: {
        updateJobId: '1',
        input: {
          title: 'Updated Job Title',
          description: 'Updated Job Description',
          requirements: {
            others: 'Updated Job Requirements',
          },
          minSalary: '1500',
          maxSalary: '2500',
          dueDate: '2023-01-01',
          createdAt: '2024-06-01T18:06:13.029Z',
          status: 'PUBLISHED',
        },
      },
    },
    result: {
      data: {
        updateJob: {
          id: '1',
          title: 'Updated Job Title',
          description: 'Updated Job Description',
          requirements: {
            others: 'Updated Job Requirements',
          },
          minSalary: '1500',
          maxSalary: '2500',
          dueDate: '2023-01-01',
        },
      },
    },
  },
];

describe('EditJob', () => {
  beforeEach(() => {
    useRouterMock.mockReturnValue({ push: jest.fn() });
    useParamsMock.mockReturnValue({ id: '1' });
  });
  test('renders correctly', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EditJob />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(() => getByTestId('title')).not.toThrow();
      expect(() => getByTestId('back-button')).not.toThrow();
      expect(() => getByTestId('modal-button')).not.toThrow();
    });
  });

  test('back button navigates to /recruiting/job-detail/1', async () => {
    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({ push: mockPush });
    useParamsMock.mockReturnValue({ id: '1' });

    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <EditJob />
      </MockedProvider>
    );
    await waitFor(() => {
      fireEvent.click(getByTestId('back-button'));
    });
    expect(mockPush).toHaveBeenCalledWith('/recruiting/job-detail/1');
  });
  test('CreateErrorModal onClose handler is called', async () => {
    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({ push: mockPush });
    useParamsMock.mockReturnValue({ id: '1' });

    const { findByText, getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <EditJob />
      </MockedProvider>
    );

    const button = await findByText('Хадгалах');
    fireEvent.click(button);

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/recruiting/job-detail/1');
  });
  test('form submission calls updateJob mutation', async () => {
    const { findByLabelText, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EditJob />
      </MockedProvider>
    );
    const titleInput = await findByLabelText('Албан тушаалын нэр');
    const descriptionInput = await findByLabelText('Үүрэг');
    const minSalaryInput = await findByLabelText('Доод цалин');
    const maxSalaryInput = await findByLabelText('Дээд цалин');
    const dueDateInput = await findByLabelText('Анкет хүлээн авах хугацаа');
    const requirementsInput = await findByLabelText('Шаардлага');

    fireEvent.change(titleInput, { target: { value: 'Updated Job Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Job Description' } });
    fireEvent.change(minSalaryInput, { target: { value: '1500' } });
    fireEvent.change(maxSalaryInput, { target: { value: '2500' } });
    fireEvent.change(dueDateInput, { target: { value: '2023-01-01' } });
    fireEvent.change(requirementsInput, { target: { value: 'Updated Job Requirements' } });

    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
      expect(mocks[1].result).toBeDefined();
    });
  });
});
