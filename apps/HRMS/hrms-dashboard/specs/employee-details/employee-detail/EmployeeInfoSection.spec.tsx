import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EmployeeInfoContainer from '../../../src/app/employee-details/employee-detail/_components/EmplyeeInfoSection';

describe('EmployeeInfoContainer', () => {
  it('renders correctly with info fields', () => {
    const mockEmployee = {
      dateOfEmployment: '2023-03-09',
      department: 'Хөгжүүлэлтийн хэлтэс',
      email: 'example@example.com',
      employmentStatus: 'Үндсэн ажилтан',
      firstname: 'John',
      id: '1',
      imageURL: '',
      jobTitle: ['Дизайнер'],
      lastname: 'Doe',
      salary: '1000',
      __typename: 'Employee',
    };
    sessionStorage.setItem('employeeDetails', JSON.stringify(mockEmployee));

    render(<EmployeeInfoContainer />);

    expect(screen.getByText('Хөдөлмөр эрхлэлтийн мэдээлэл')).toBeInTheDocument();

    const infoFields = [
      { title: 'Албан тушаал', value: 'Дизайнер' },
      { title: 'Хэлтэс', value: 'Хөгжүүлэлтийн хэлтэс' },
      { title: 'Ажилд орсон өдөр', value: '2023-03-09' },
      { title: 'Ажилласан хугацаа', value: '1 жил' },
      { title: 'Төлөв', value: 'Үндсэн ажилтан' },
    ];

    infoFields.forEach((field) => {
      expect(screen.getByText(field.title)).toBeInTheDocument();
      expect(screen.getByText(field.value)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Засварлах' })).toBeInTheDocument();
  });
});
