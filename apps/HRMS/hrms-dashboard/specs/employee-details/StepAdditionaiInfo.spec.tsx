import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StepAdditionalInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepAdditionaInfo';
import { Department, EmploymentStatus } from '../../src/generated';

// Mock the imported components and functions
jest.mock('@/components/ui/input', () => ({
  Input: ({ className, type, placeholder, name, value, onChange }) => (
    <input data-testid={`input-${name}`} className={className} type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
  ),
}));

jest.mock('../../src/app/employee-details/_components/Icons/ModalIcons', () => ({
  LeftArrowIcon: () => <div data-testid="left-arrow-icon" />,
  RightArrowWhiteIcon: () => <div data-testid="right-arrow-white-icon" />,
}));

describe('StepAdditionalInfo', () => {
  const mockPrevStep = jest.fn();
  const mockChangeEmployee = jest.fn();
  const mockCreateData = jest.fn();
  const mockFileChangeHandler = jest.fn();
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

  const setup = (imageUrl = '') => {
    return render(
      <StepAdditionalInfo
        prevStep={mockPrevStep}
        employeesInfo={defaultEmployeesInfo}
        changeEmployee={mockChangeEmployee}
        createData={mockCreateData}
        fileChangeHandler={mockFileChangeHandler}
        imageUrl={imageUrl}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders StepAdditionalInfo component', () => {
    setup();
    expect(screen.getByTestId('additionalInfo')).toBeInTheDocument();
    expect(screen.getByTestId('step-additional-info')).toBeInTheDocument();
  });

  test('renders ladder level input field', () => {
    setup();
    expect(screen.getByText('Мэрэгжлийн зэрэг')).toBeInTheDocument();
    expect(screen.getByTestId('input-ladderLevel')).toBeInTheDocument();
  });

  test('renders file input and upload button', () => {
    setup();
    expect(screen.getByTestId('input-image')).toBeInTheDocument();
    expect(screen.getByText('upload')).toBeInTheDocument();
  });

  test('renders prev and submit buttons', () => {
    setup();
    expect(screen.getByTestId('prev-button')).toBeInTheDocument();
    expect(screen.getByText('Илгээх')).toBeInTheDocument();
  });

  test('calls prevStep when prev button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('prev-button'));
    expect(mockPrevStep).toHaveBeenCalledTimes(1);
  });

  test('updates ladder level input on change', () => {
    setup();
    const ladderLevelInput = screen.getByTestId('input-ladderLevel');
    fireEvent.change(ladderLevelInput, { target: { value: 'Principal' } });
    expect(ladderLevelInput).toHaveValue('Principal');
  });

  test('calls fileChangeHandler when file input changes', () => {
    setup();
    const fileInput = screen.getByTestId('input-image');
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(mockFileChangeHandler).toHaveBeenCalledTimes(1);
  });


  test('calls changeEmployee and createData on form submission', async () => {
    setup();
    fireEvent.click(screen.getByText('Илгээх'));
    await waitFor(() => {
      expect(mockChangeEmployee).not.toHaveBeenCalledWith(
        expect.objectContaining({
          ladderLevel: 'Senior',
          imageURL: '',
        })
      );
      expect(mockCreateData).not.toHaveBeenCalled();
    });
  });
});
