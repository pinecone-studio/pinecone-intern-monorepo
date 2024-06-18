import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Steps } from '../../src/app/employee-details/_components/add-employee-steps/Steps';

describe('setAddEmployeesDetails function', () => {
  it('updates addEmployeesDetails state correctly', () => {
    render(<Steps />);

    // Fill out the form inputs
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    // Check if addEmployeesDetails state is updated correctly
    expect(screen.getByText('addEmployeesDetails')).toHaveTextContent('John');
    expect(screen.getByText('addEmployeesDetails')).toHaveTextContent('Doe');
    expect(screen.getByText('addEmployeesDetails')).toHaveTextContent('john.doe@example.com');
  });
});
