import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AddEmployee } from '../../src/app/employee-details/_components/modal/AddEmployee';
import { Department, EmploymentStatus } from '../../src/generated';

describe('AddEmployee component', () => {
  test('renders AddEmployee component', () => {
    const mockProps = {
      currentStep: 0,
      steps: [
        { title: 'Step 1', content: 'Content 1' },
        { title: 'Step 2', content: 'Content 2' },
      ],
      nextStep: jest.fn(),
      prevStep: jest.fn(),
      employeesInfo: {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        imageURL: 'https://example.com/image.jpg',
        department: Department.Software,
        jobTitle: ['Manager'],
        ladderLevel: 'L1',
        salary: '50000',
        dateOfEmployment: new Date(),
        employmentStatus: EmploymentStatus.FullTime,
      },
      changeEmployee: jest.fn(),
      createData: jest.fn(),
      fileChangeHandler: jest.fn(),
      imageUrl: 'https://example.com/image.jpg',
    };

    render(<AddEmployee {...mockProps} />);

    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();

    const addButton = screen.getByText('Ажилчид');
    expect(addButton).toBeInTheDocument();
  });
});
