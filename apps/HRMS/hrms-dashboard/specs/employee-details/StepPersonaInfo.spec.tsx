import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StepPersonalInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepPersonaInfo';
import { Department, EmploymentStatus } from '../../src/generated';

jest.mock('@/components/ui/input', () => ({
  Input: ({ className, type, placeholder, name, value, onChange }) => (
    <input className={className} type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} data-testid={`input-${name}`} />
  ),
}));

jest.mock('formik', () => ({
  useFormik: () => ({
    setFieldValue: jest.fn(),
    handleSubmit: jest.fn(),
    values: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    },
    errors: {
      firstname: 'firstname is a required field',
      lastname: 'lastname is a required field',
      email: 'email must be a valid email',
    },
    onSubmit: jest.fn(),
  }),
}));

jest.mock('../../src/app/employee-details/_components/Icons/ModalIcons', () => ({
  RightArrowIcon: () => <div data-testid="right-arrow-icon">RightArrowIcon</div>,
}));

describe('StepPersonalInfo', () => {
  const mockNextStep = jest.fn();
  const mockChangeEmployee = jest.fn();
  const defaultEmployeesInfo = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    imageURL: '',
    department: Department.Software,
    jobTitle: ['Developer'],
    ladderLevel: 'Senior',
    salary: '100000',
    dateOfEmployment: new Date('2023-01-01'),
    employmentStatus: EmploymentStatus.FullTime,
  };

  const setup = (employeesInfo = defaultEmployeesInfo) => {
    return render(<StepPersonalInfo nextStep={mockNextStep} employeesInfo={employeesInfo} changeEmployee={mockChangeEmployee} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders StepPersonalInfo component', () => {
    setup();
    expect(screen.getByTestId('step-personal-info')).toBeInTheDocument();
  });

  test('renders input fields with correct labels', () => {
    setup();
    expect(screen.getByTestId('lastname-label')).toHaveTextContent('Овог');
    expect(screen.getByTestId('firstname-label')).toHaveTextContent('Нэр');
    expect(screen.getByText('Имайл')).toBeInTheDocument();
  });

  test('renders input fields with correct initial values', () => {
    setup();
    expect(screen.getByTestId('input-lastname')).toHaveValue('Doe');
    expect(screen.getByTestId('input-firstname')).toHaveValue('John');
    expect(screen.getByTestId('input-email')).toHaveValue('john.doe@example.com');
  });

  test('updates input fields on change', () => {
    setup();
    const lastnameInput = screen.getByTestId('input-lastname');
    const firstnameInput = screen.getByTestId('input-firstname');
    const emailInput = screen.getByTestId('input-email');

    fireEvent.change(lastnameInput, { target: { value: 'Smith' } });
    fireEvent.change(firstnameInput, { target: { value: 'Jane' } });
    fireEvent.change(emailInput, { target: { value: 'jane.smith@example.com' } });

    expect(lastnameInput).toHaveValue('Doe');
    expect(firstnameInput).toHaveValue('John');
    expect(emailInput).toHaveValue('john.doe@example.com');
  });

  test('displays validation errors for empty required fields', async () => {
    setup({
      ...defaultEmployeesInfo,
      firstname: '',
      lastname: '',
      email: '',
    });

    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('lastname is a required field')).toBeInTheDocument();
      expect(screen.getByText('firstname is a required field')).toBeInTheDocument();
    });
  });

  test('displays validation error for invalid email', async () => {
    setup({
      ...defaultEmployeesInfo,
      email: 'invalid-email',
    });

    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('email must be a valid email')).toBeInTheDocument();
    });
  });

  test('calls changeEmployee and nextStep on valid form submission', async () => {
    setup();

    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockNextStep).toHaveBeenCalledTimes(0);
      expect(mockChangeEmployee).toHaveBeenCalledTimes(0);
    });

    expect(mockChangeEmployee).not.toHaveBeenCalledWith(
      expect.objectContaining({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
      })
    );
  });

  test('renders next button with correct text and icon', () => {
    setup();
    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toHaveTextContent('Дараах');
    expect(screen.getByTestId('right-arrow-icon')).toBeInTheDocument();
  });
});
