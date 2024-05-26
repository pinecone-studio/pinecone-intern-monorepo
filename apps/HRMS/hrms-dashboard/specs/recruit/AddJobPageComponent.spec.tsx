import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AddJobPageComponent, CreateErrorModal } from '../../src/app/recruiting/_components/index';
import { CREATE_JOB_MUTATION } from '../../src/app/recruiting/_components/add-job/create-job-mutation';
import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const createJobMock = {
  request: {
    query: CREATE_JOB_MUTATION,
    variables: {
      input: {
        title: 'Test job',
        description: 'Test description',
        requirements: {
          others: 'Test requirements',
        },
        minSalary: '1000',
        maxSalary: '2000',
        dueDate: '2022-12-31',
        createdAt: new Date().toISOString(),
        status: 'PUBLISHED',
      },
    },
  },
  result: {
    data: {
      createJobRecruit: {
        id: '1',
        title: 'Test job',
        description: 'Test description',
        requirements: {
          others: 'Test requirements',
        },
        minSalary: '1000',
        maxSalary: '2000',
        dueDate: '2022-12-31',
        createdAt: new Date().toISOString(),
        status: 'PUBLISHED',
      },
    },
  },
};

describe('AddJobPageComponent', () => {
  test('renders correctly', () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    const { getByTestId } = render(
      <MockedProvider mocks={[createJobMock]}>
        <AddJobPageComponent />
      </MockedProvider>
    );
    expect(() => getByTestId('title')).not.toThrow();
    expect(() => getByTestId('back-button')).not.toThrow();
    expect(() => getByTestId('modal-button')).not.toThrow();
  });

  test('back button navigates to /recruiting', () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    const { getByTestId } = render(
      <MockedProvider mocks={[createJobMock]}>
        <AddJobPageComponent />
      </MockedProvider>
    );
    fireEvent.click(getByTestId('back-button'));
    expect(mockPush).toHaveBeenCalledWith('/recruiting');
  });

  test('form submission calls mutation with correct values', async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    const { getByLabelText, getByTestId } = render(
      <MockedProvider mocks={[createJobMock]} addTypename={false}>
        <AddJobPageComponent />
      </MockedProvider>
    );

    fireEvent.change(getByLabelText('Албан тушаалын нэр'), { target: { value: 'Test job' } });
    fireEvent.change(getByLabelText('Үүрэг'), { target: { value: 'Test description' } });
    fireEvent.change(getByLabelText('Шаардлага'), { target: { value: 'Test requirements' } });
    fireEvent.change(getByLabelText('Доод цалин'), { target: { value: '1000' } });
    fireEvent.change(getByLabelText('Дээд цалин'), { target: { value: '2000' } });
    fireEvent.change(getByLabelText('Анкет хүлээн авах хугацаа'), { target: { value: '2022-12-31' } });

    fireEvent.click(getByTestId('modal-button'));

    await waitFor(() => {
      expect(createJobMock.request.variables.input.title).toBe('Test job');
      expect(createJobMock.request.variables.input.description).toBe('Test description');
      expect(createJobMock.request.variables.input.requirements.others).toBe('Test requirements');
      expect(createJobMock.request.variables.input.minSalary).toBe('1000');
      expect(createJobMock.request.variables.input.maxSalary).toBe('2000');
      expect(createJobMock.request.variables.input.dueDate).toBe('2022-12-31');
    });
  });

  test('form submits correctly', async () => {
    const { getByLabelText, getByText } = render(
      <MockedProvider mocks={[createJobMock]} addTypename={false}>
        <AddJobPageComponent />
      </MockedProvider>
    );

    fireEvent.change(getByLabelText('Албан тушаалын нэр'), { target: { value: 'Test title' } });
    fireEvent.change(getByLabelText('Үүрэг'), { target: { value: 'Test description' } });
    fireEvent.change(getByLabelText('Шаардлага'), { target: { value: 'Test requirements' } });
    fireEvent.change(getByLabelText('Доод цалин'), { target: { value: '1000' } });
    fireEvent.change(getByLabelText('Дээд цалин'), { target: { value: '2000' } });
    fireEvent.change(getByLabelText('Анкет хүлээн авах хугацаа'), { target: { value: '2022-12-31' } });

    fireEvent.click(getByText('Хадгалах'));

    await waitFor(() => {
      expect((getByLabelText('Албан тушаалын нэр') as HTMLInputElement).value).toBe('Test title');
      expect((getByLabelText('Үүрэг') as HTMLInputElement).value).toBe('Test description');
      expect((getByLabelText('Шаардлага') as HTMLInputElement).value).toBe('Test requirements');
      expect((getByLabelText('Доод цалин') as HTMLInputElement).value).toBe('1000');
      expect((getByLabelText('Дээд цалин') as HTMLInputElement).value).toBe('2000');
      expect((getByLabelText('Анкет хүлээн авах хугацаа') as HTMLInputElement).value).toBe('2022-12-31');
    });
  });

  test('CreateErrorModal onClick handler is called', () => {
    const mockOnClick = jest.fn();

    const { getByText } = render(<CreateErrorModal text="Хадгалах" labelType="Хадгалах" onClick={mockOnClick} />);

    fireEvent.click(getByText('Хадгалах'));

    expect(mockOnClick).toHaveBeenCalled();
  });
  test('CreateErrorModal onClose handler is called', () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    const { getByText, getByTestId } = render(
      <MockedProvider mocks={[createJobMock]}>
        <AddJobPageComponent />
      </MockedProvider>
    );

    fireEvent.click(getByText('Хадгалах'));

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/recruiting');
  });
});
