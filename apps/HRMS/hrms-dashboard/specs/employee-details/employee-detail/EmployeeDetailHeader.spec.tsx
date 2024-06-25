import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeDetailHeader from '../../../src/app/employee-details/employee-detail/_components/EmployeeDetailHeader';
describe('Stepper component', () => {
  it('Should renders step container ', () => {
    render(<EmployeeDetailHeader />);
    const stepContainer = screen.getByTestId('employeeDetailHeader');
    expect(stepContainer).toBeInTheDocument();
  });
});
