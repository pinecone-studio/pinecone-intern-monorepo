import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { StudentsInformation } from '../../src/app/student/_features/studentsTable/StudentsInformation';

// Mock the useGetStudentByClassIdQuery hook from '@/generated'
jest.mock('@/generated', () => ({
  useGetStudentByClassIdQuery: jest.fn(),
}));

describe('StudentsInformation component', () => {
  it('renders loading state', async () => {
    // Mock data for when loading is true
    const mockUseGetStudentByClassIdQuery = {
      data: undefined,
      loading: true,
      error: undefined,
    };
    // Mock the hook's return value
    require('@/generated').useGetStudentByClassIdQuery.mockReturnValue(mockUseGetStudentByClassIdQuery);

    let component;
    await act(async () => {
      component = render(<StudentsInformation />);
    });

    expect(component.getByTestId('Loading')).toBeDefined();
  });

  it('renders success state', async () => {
    // Mock data for when loading is false and data is returned
    const mockStudentsData = [
      {
        firstName: 'TEST',
        studentCode: '123456789',
        email: 'test@gmail.com',
        phoneNumber: '98989898989',
        active: true,
        profileImgUrl: '1234567URL',
      },
    ];
    const mockUseGetStudentByClassIdQuery = {
      data: {
        getStudentsByClassId: mockStudentsData,
      },
      loading: false,
      error: undefined,
    };
    // Mock the hook's return value
    require('@/generated').useGetStudentByClassIdQuery.mockReturnValue(mockUseGetStudentByClassIdQuery);

    let component;
    await act(async () => {
      component = render(<StudentsInformation />);
    });

    const tableRows = component.getAllByRole('row');
    expect(tableRows.length).toBe(mockStudentsData.length + 1); // +1 for header row
  });
});
