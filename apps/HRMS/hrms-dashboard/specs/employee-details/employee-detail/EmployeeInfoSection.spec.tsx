import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmployeeInfoSection } from '../../../src/app/employee-details/employee-detail/_components/EmplyeeInfoSection';

const mockSessionStorage = {
  getItem: jest.fn(),
};
Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

const mockEmployee = {
  dateOfEmployment: '2023-01-01',
  department: 'IT',
  email: 'john@example.com',
  employmentStatus: 'Active',
  firstname: 'John',
  id: '1',
  imageURL: 'http://example.com/image.jpg',
  jobTitle: ['Developer', 'Team Lead'],
  lastname: 'Doe',
  salary: '100000',
  __typename: 'Employee',
};

describe('EmployeeInfoSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "No employee selected" when no employee data is available', () => {
    mockSessionStorage.getItem.mockReturnValue(null);
    render(<EmployeeInfoSection />);
    expect(screen.getByText('No employee selected')).toBeInTheDocument();
  });

  it('renders employee information when data is available', async () => {
    mockSessionStorage.getItem.mockReturnValue(JSON.stringify(mockEmployee));

    await act(async () => {
      render(<EmployeeInfoSection />);
    });

    expect(screen.getByText('Хөдөлмөр эрхлэлтийн мэдээлэл')).toBeInTheDocument();
    expect(screen.getByText('Засварлах')).toBeInTheDocument();

    const fieldTitles = ['Албан тушаал', 'Хэлтэс', 'Ажилд орсон өдөр', 'Ажилласан хугацаа', 'Төлөв'];
    const fieldValues = ['Developer, Team Lead', 'IT', '2023-01-01', '1 жил', 'Active'];

    fieldTitles.forEach((title) => {
      expect(screen.getByText(title, { exact: false })).toBeInTheDocument();
    });

    fieldValues.forEach((value) => {
      expect(screen.getByText(value, { exact: false })).toBeInTheDocument();
    });
  });

  it('handles missing employee data fields', async () => {
    const incompleteEmployee = { ...mockEmployee, jobTitle: undefined, department: '', dateOfEmployment: null };
    mockSessionStorage.getItem.mockReturnValue(JSON.stringify(incompleteEmployee));

    await act(async () => {
      render(<EmployeeInfoSection />);
    });

    expect(screen.getByTestId('field-title-0')).toHaveTextContent('Албан тушаал');
    expect(screen.getByTestId('field-title-1')).toHaveTextContent('Хэлтэс');
    expect(screen.getByTestId('field-title-2')).toHaveTextContent('Ажилд орсон өдөр');
    expect(screen.getByTestId('field-title-3')).toHaveTextContent('Ажилласан хугацаа');
    expect(screen.getByTestId('field-title-4')).toHaveTextContent('Төлөв');
  });

  it('renders correct employment status when defined', async () => {
    mockSessionStorage.getItem.mockReturnValue(JSON.stringify(mockEmployee));

    await act(async () => {
      render(<EmployeeInfoSection />);
    });

    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders default employment status when undefined', async () => {
    const employeeWithoutStatus = { ...mockEmployee, employmentStatus: undefined };
    mockSessionStorage.getItem.mockReturnValue(JSON.stringify(employeeWithoutStatus));

    await act(async () => {
      render(<EmployeeInfoSection />);
    });

    expect(screen.getByTestId('status-value')).toHaveTextContent('Төлөв');
  });
});
