import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EmployeeInfoContainer from '../../../src/app/employee-details/employee-detail/_components/EmplyeeInfoSection';

describe('EmployeeInfoSection', () => {
  it('renders correctly with info fields', () => {
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
      expect(screen.getByPlaceholderText(field.value)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Засварлах' })).toBeInTheDocument();
  });
});
