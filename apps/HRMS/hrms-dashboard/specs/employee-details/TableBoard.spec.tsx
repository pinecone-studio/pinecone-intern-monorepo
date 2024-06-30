import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableDemo } from '../../src/app/employee-details/_components/TableBoard';
import { Employee, Department, EmploymentStatus } from '../../src/generated';

describe('Table components', () => {
  it('should render table components correctly', () => {
    const mockEmployees: Employee[] = [
      {
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        imageURL: 'https://via.placeholder.com/40',
        department: Department.Software,
        jobTitle: ['Manager'],
        ladderLevel: '1',
        salary: '50000',
        dateOfEmployment: new Date(),
        employmentStatus: EmploymentStatus.FullTime,
      },
      {
        id: '2',
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        imageURL: 'https://via.placeholder.com/40',
        department: Department.Software,
        jobTitle: ['Engineer'],
        ladderLevel: '2',
        salary: '60000',
        dateOfEmployment: new Date(),
        employmentStatus: EmploymentStatus.FullTime,
      },
    ];

    render(<TableDemo employees={mockEmployees} />);

    const tableContent = screen.getByTestId('content');
    expect(tableContent).toBeInTheDocument();

    for (let i = 1; i <= 5; i++) {
      const head = screen.getByTestId(`tableHead-${i}`);
      expect(head).toBeInTheDocument();
    }

    mockEmployees.forEach((employee, index) => {
      const row = screen.getByTestId(`TableContent-${index}`);
      expect(row).toBeInTheDocument();

      const cell1 = screen.getByTestId(`tableCell-1-${index}`);
      expect(cell1).toHaveTextContent(employee.firstname);

      const cell2 = screen.getByTestId(`tableCell-2-${index}`);
      expect(cell2).toHaveTextContent(employee.jobTitle.join(', '));

      const cell3 = screen.getByTestId(`tableCell-3-${index}`);
      expect(cell3).toHaveTextContent(employee.email);

      const cell4 = screen.getByTestId(`tableCell-4-${index}`);
      expect(cell4).toHaveTextContent(employee.department);

      const cell5 = screen.getByTestId(`tableCell-5-${index}`);
      expect(cell5).toHaveTextContent(employee.employmentStatus);
    });
  });
});
