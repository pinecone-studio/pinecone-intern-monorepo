import React from 'react';
import { render, screen } from '@testing-library/react';
import { StudentsInformation } from '../../src/app/student/_components/StudentsInformation';
import { useGetStudentByClassIdQuery } from '../../src/generated';
import StudentsTable from '../../src/app/student/_components/StudentsTable';

// Mock the generated hook
jest.mock('@/generated', () => ({
  useGetStudentByClassIdQuery: jest.fn(),
}));

// Mock the StudentsTable component
jest.mock('../../src/app/student/_components/StudentsTable', () => jest.fn(() => null));

describe('StudentsInformation', () => {
  it('renders loading state', () => {
    (useGetStudentByClassIdQuery as jest.Mock).mockReturnValue({
      loading: true,
      data: undefined,
    });

    render(<StudentsInformation />);
    expect(screen.getByTestId('Loading')).toBeDefined();
  });

  it('renders StudentsTable when data is loaded', () => {
    const mockStudents = [{ id: '1', name: 'John Doe' }];
    (useGetStudentByClassIdQuery as jest.Mock).mockReturnValue({
      loading: false,
      data: { getStudentsByClassId: mockStudents },
    });

    render(<StudentsInformation />);
    expect(StudentsTable).toHaveBeenCalledWith({ studentsData: mockStudents }, {});
  });

  it('calls useGetStudentByClassIdQuery with correct variables', () => {
    render(<StudentsInformation />);
    expect(useGetStudentByClassIdQuery).toHaveBeenCalledWith({
      variables: { classId: '12345' },
    });
  });
});
