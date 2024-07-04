import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableDemo } from '../../src/app/employee-details/_components/TableBoard';

const mockEmployees = [
  {
    firstname: 'John',
    jobTitle: 'Software Engineer',
    email: 'john@example.com',
    department: 'Engineering',
    employmentStatus: 'Active',
    imageURL: 'path_to_image_url',
  },
  {
    firstname: 'Jane',
    jobTitle: 'Product Manager',
    email: 'jane@example.com',
    department: 'Product',
    employmentStatus: 'Inactive',
    imageURL: 'path_to_image_url',
  },
];
describe('Table components', () => {
  it('should render table components correctly', () => {
    render(<TableDemo employees={mockEmployees} />);
    const tableContent = screen.getByTestId('content');
    expect(tableContent).toBeInTheDocument();

    for (let i = 1; i <= 5; i++) {
      const head = screen.getByTestId(`tableHead-${i}`);
      expect(head).toBeInTheDocument();
    }

    mockEmployees.forEach((_, index) => {
      const tableContentBody = screen.getByTestId(`TableContent-${index}`);
      expect(tableContentBody).toBeInTheDocument();

      for (let i = 1; i <= 5; i++) {
        const bodyData = screen.getByTestId(`tableCell-${i}-${index}`);
        expect(bodyData).toBeInTheDocument();
      }
    });
  });
});
