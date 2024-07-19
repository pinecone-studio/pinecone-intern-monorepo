import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StepJobInfo } from '../../src/app/employee-details/_components/add-employee-steps/StepJobInfo';
import { Department, EmploymentStatus } from '../../src/generated';

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, 'data-testid': testId }) => (
    <select data-testid={testId} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  ),
  SelectContent: ({ children }) => children,
  SelectItem: ({ children, value }) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }) => children,
  SelectValue: () => null,
}));

describe('StepJobInfo', () => {
  const mockProps = {
    jobTitle: ['Software Engineer'],
    salary: '100000',
    onChangeHandler: jest.fn(),
    setValueFormik: jest.fn(),
    nextStep: jest.fn(),
    prevStep: jest.fn(),
    isValidJobInfo: false,
  };

  it('renders all form elements correctly', () => {
    render(<StepJobInfo {...mockProps} />);

    expect(screen.getByText('Хэлтэс')).toBeInTheDocument();
    expect(screen.getByText('Мэргэжил')).toBeInTheDocument();
    expect(screen.getByText('Цалин')).toBeInTheDocument();
    expect(screen.getByText('Ажлын цаг')).toBeInTheDocument();
    expect(screen.getByTestId('prev-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
  });

  it('calls onChangeHandler when input values change', () => {
    render(<StepJobInfo {...mockProps} />);

    const jobTitleInput = screen.getByLabelText('Мэргэжил');
    const salaryInput = screen.getByLabelText('Цалин');

    fireEvent.change(jobTitleInput, { target: { value: 'Product Manager' } });
    fireEvent.change(salaryInput, { target: { value: '120000' } });

    expect(mockProps.onChangeHandler).toHaveBeenCalledTimes(2);
  });

  it('calls setValueFormik when department is selected', async () => {
    render(<StepJobInfo {...mockProps} />);

    const departmentSelect = screen.getByTestId('department-select');
    fireEvent.change(departmentSelect, { target: { value: Department.Software } });

    await waitFor(() => {
      expect(mockProps.setValueFormik).toHaveBeenCalledWith('department', Department.Software);
    });
  });

  it('calls setValueFormik when employment status is selected', async () => {
    render(<StepJobInfo {...mockProps} />);

    const statusSelect = screen.getByTestId('status-select');
    fireEvent.change(statusSelect, { target: { value: EmploymentStatus.FullTime } });

    await waitFor(() => {
      expect(mockProps.setValueFormik).toHaveBeenCalledWith('employmentStatus', EmploymentStatus.FullTime);
    });
  });

  it('calls prevStep when previous button is clicked', () => {
    render(<StepJobInfo {...mockProps} />);

    const prevButton = screen.getByTestId('prev-button');
    fireEvent.click(prevButton);

    expect(mockProps.prevStep).toHaveBeenCalledTimes(1);
  });

  it('calls nextStep when next button is clicked and form is valid', () => {
    render(<StepJobInfo {...mockProps} />);

    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    expect(mockProps.nextStep).toHaveBeenCalledTimes(1);
  });

  it('applies disabled styles to next button when isValidJobInfo is true', () => {
    render(<StepJobInfo {...mockProps} isValidJobInfo={true} />);

    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toHaveClass('opacity-50');
  });

  it('applies enabled styles to next button when isValidJobInfo is false', () => {
    render(<StepJobInfo {...mockProps} isValidJobInfo={false} />);

    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toHaveClass('opacity-100');
  });

  it('applies correct styles to next button based on isValidJobInfo', () => {
    const { rerender } = render(<StepJobInfo {...mockProps} isValidJobInfo={false} />);

    let nextButton = screen.getByTestId('next-button');
    expect(nextButton).toHaveClass('opacity-100');

    rerender(<StepJobInfo {...mockProps} isValidJobInfo={true} />);
    nextButton = screen.getByTestId('next-button');
    expect(nextButton).toHaveClass('opacity-50');
  });
});
