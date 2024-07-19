import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TableDemo } from '../../src/app/employee-details/_components/TableBoard';
import { useRouter } from 'next/navigation';

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

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();
const setItemMock = jest.spyOn(Storage.prototype, 'setItem');

(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});

describe('Table components', () => {
  beforeEach(() => {
    render(<TableDemo employees={mockEmployees} />);
  });

  it('should render table components correctly', () => {
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

  it('should call addToDetails function and push to the correct path when edit button is clicked', () => {
    mockEmployees.forEach((employee, index) => {
      const editButton = screen.getAllByText('edit')[index];

      fireEvent.click(editButton);

      expect(setItemMock).toHaveBeenCalledWith('employeeDetails', JSON.stringify(employee));
      expect(pushMock).toHaveBeenCalledWith('/employee-details/employee-detail');
    });
  });
});
