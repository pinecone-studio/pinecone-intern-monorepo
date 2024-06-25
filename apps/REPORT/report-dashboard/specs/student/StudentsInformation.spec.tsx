import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { StudentsInformation } from '../../src/app/student/_features/studentsTable/StudentsInformation';

jest.mock('../../src/generated');

describe('StudentsInformation component', () => {
  it('renders loading state', async () => {
    const mockUseGetStudentByClassIdQuery = {
      data: undefined,
      loading: true,
      error: undefined,
    };
    require('../../src/generated').useGetStudentByClassIdQuery.mockReturnValue(mockUseGetStudentByClassIdQuery);
    let component;
    await act(async () => {
      component = render(<StudentsInformation />);
    });

    expect(component.getByTestId('Loading')).toBeDefined();
  });

  it('renders error state', async () => {
    const mockUseGetStudentByClassIdQuery = {
      data: undefined,
      loading: false,
      error: new Error('Mock error message'),
    };
    require('../../src/generated').useGetStudentByClassIdQuery.mockReturnValue(mockUseGetStudentByClassIdQuery);

    let component;
    await act(async () => {
      component = render(<StudentsInformation />);
    });

    expect(component.getByTestId('Error')).toBeDefined();
  });

  it('renders success state', async () => {
    const mockStudentsData = [
      {
        firstName: 'TEST',
        studentCode: '123456789',
        email: 'TEST@gmail.com',
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
    require('../../src/generated').useGetStudentByClassIdQuery.mockReturnValue(mockUseGetStudentByClassIdQuery);

    let component;
    await act(async () => {
      component = render(<StudentsInformation />);
    });

    const tableRows = component.getAllByRole('row');
    expect(tableRows.length).toBe(mockStudentsData.length + 1);
  });
});
