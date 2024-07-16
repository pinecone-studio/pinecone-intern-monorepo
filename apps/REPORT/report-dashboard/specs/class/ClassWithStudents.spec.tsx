import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../../src/app/class/[slug]/page'; // Adjust the import path as needed
import { Student } from '../../src/generated';

// Create a mock function for useGetStudentByClassIdQuery
const mockUseGetStudentByClassIdQuery = jest.fn();

// Define the props type for StudentsTable
type StudentsTableProps = {
  studentsData: Student[];
};

// Create a mock function for StudentsTable with the correct type
const mockStudentsTable = jest.fn<React.ReactElement, [StudentsTableProps]>(() => <div data-testid="students-table">Mocked StudentsTable</div>);

jest.mock('@/generated', () => ({
  ...jest.requireActual('@/generated'),
  useGetStudentByClassIdQuery: (...args: any) => mockUseGetStudentByClassIdQuery(...args),
}));

jest.mock('@/app/student/_features/studentsTable/StudentsTable', () => ({
  __esModule: true,
  default: (props: StudentsTableProps) => mockStudentsTable(props),
}));

describe('Page Component', () => {
  const mockParams = { slug: '123' };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetStudentByClassIdQuery.mockImplementation(() => ({
      loading: false,
      error: undefined,
      data: undefined,
    }));
  });

  it('renders loading state', () => {
    mockUseGetStudentByClassIdQuery.mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
    });

    render(<Page params={mockParams} />);
    expect(screen.getByTestId('Loading')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders StudentsTable when data is loaded', () => {
    const mockStudentsData = [{ id: '1', name: 'John Doe' }];
    mockUseGetStudentByClassIdQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { getStudentsByClassId: mockStudentsData },
    });

    render(<Page params={mockParams} />);
    expect(screen.getByTestId('students-table')).toBeInTheDocument();
    expect(mockStudentsTable).toHaveBeenCalledWith({ studentsData: mockStudentsData });
  });

  it('renders error message when there is an error', () => {
    const errorMessage = 'Test error message';
    mockUseGetStudentByClassIdQuery.mockReturnValue({
      loading: false,
      error: new Error(errorMessage),
      data: undefined,
    });

    render(<Page params={mockParams} />);
    expect(screen.getByTestId('Error')).toBeInTheDocument();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('does not render error message or StudentsTable when loading', () => {
    mockUseGetStudentByClassIdQuery.mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
    });

    render(<Page params={mockParams} />);
    expect(screen.queryByTestId('Error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('students-table')).not.toBeInTheDocument();
    expect(screen.getByTestId('Loading')).toBeInTheDocument();
  });

  it('calls useGetStudentByClassIdQuery with correct variables', () => {
    render(<Page params={mockParams} />);
    expect(mockUseGetStudentByClassIdQuery).toHaveBeenCalledWith({
      variables: { classId: '123' },
    });
  });
});
