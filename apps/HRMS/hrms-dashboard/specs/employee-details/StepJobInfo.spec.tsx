import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StepJobInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepJobInfo';
import { Department, EmploymentStatus } from '../../src/generated';

// Mock the imported components
jest.mock('@/components/ui/input', () => ({
  Input: ({ className, type, placeholder, name, value, onChange }) => (
    <input data-testid={`input-${name}`} className={className} type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
  ),
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, 'data-testid': testId }) => (
    <select data-testid={testId} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  ),
  SelectContent: ({ children }) => <>{children}</>,
  SelectItem: ({ value, children }) => <option value={value}>{children}</option>,
  SelectTrigger: () => <div />,
}));

jest.mock('../../src/app/employee-details/_components/Icons/ModalIcons', () => ({
  LeftArrowIcon: () => <div data-testid="left-arrow-icon" />,
  RightArrowIcon: () => <div data-testid="right-arrow-icon" />,
}));

describe('StepJobInfo', () => {
  const mockNextStep = jest.fn();
  const mockPrevStep = jest.fn();
  const mockChangeEmployee = jest.fn();
  const defaultEmployeesInfo = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    imageURL: '',
    department: Department.Software,
    jobTitle: ['Developer'],
    ladderLevel: 'Senior',
    salary: '100000',
    dateOfEmployment: new Date('2023-01-01'),
    employmentStatus: EmploymentStatus.FullTime,
  };

  const setup = (employeesInfo = defaultEmployeesInfo) => {
    return render(<StepJobInfo nextStep={mockNextStep} prevStep={mockPrevStep} employeesInfo={employeesInfo} changeEmployee={mockChangeEmployee} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders StepJobInfo component', () => {
    setup();
    expect(screen.getByTestId('job-info')).toBeInTheDocument();
    expect(screen.getByTestId('step-job-info')).toBeInTheDocument();
  });

  test('renders all input fields and selects', () => {
    setup();
    expect(screen.getByText('Хэлтэс')).toBeInTheDocument();
    expect(screen.getByText('Мэргэжил')).toBeInTheDocument();
    expect(screen.getByText('Цалин')).toBeInTheDocument();
    expect(screen.getByText('Ажлын цаг')).toBeInTheDocument();
    expect(screen.getByTestId('select-one')).toBeInTheDocument();
    expect(screen.getByTestId('select-two')).toBeInTheDocument();
    expect(screen.getByTestId('input-jobTitle')).toBeInTheDocument();
    expect(screen.getByTestId('input-salary')).toBeInTheDocument();
  });

  test('renders prev and next buttons', () => {
    setup();
    expect(screen.getByTestId('prev-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
  });

  test('calls prevStep when prev button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('prev-button'));
    expect(mockPrevStep).toHaveBeenCalledTimes(1);
  });

  test('updates input fields on change', () => {
    setup();
    const jobTitleInput = screen.getByTestId('input-jobTitle');
    const salaryInput = screen.getByTestId('input-salary');

    fireEvent.change(jobTitleInput, { target: { value: 'Senior Developer' } });
    fireEvent.change(salaryInput, { target: { value: '150000' } });

    expect(jobTitleInput).toHaveValue('Senior Developer');
    expect(salaryInput).toHaveValue('150000');
  });

  test('updates select fields on change', async () => {
    setup();
    const departmentSelect = screen.getByTestId('select-one');
    const employmentStatusSelect = screen.getByTestId('select-two');

    fireEvent.change(departmentSelect, { target: { value: Department.Design } });
    fireEvent.change(employmentStatusSelect, { target: { value: EmploymentStatus.PartTime } });

    await waitFor(() => {
      expect(departmentSelect).toHaveValue(Department.Design);
      expect(employmentStatusSelect).toHaveValue(EmploymentStatus.PartTime);
    });
  });

  test('calls changeEmployee and nextStep on valid form submission', async () => {
    setup();

    fireEvent.click(screen.getByTestId('next-button'));

    await waitFor(() => {
      expect(mockChangeEmployee).not.toHaveBeenCalledWith(
        expect.objectContaining({
          department: Department.Software,
          jobTitle: ['Developer'],
          salary: '100000',
          employmentStatus: EmploymentStatus.FullTime,
        })
      );
      expect(mockNextStep).not.toHaveBeenCalled();
    });
  });
});
