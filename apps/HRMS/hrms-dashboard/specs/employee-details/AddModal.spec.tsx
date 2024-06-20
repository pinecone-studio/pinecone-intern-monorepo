import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddModal } from '../../src/app/employee-details/_components/modal/AddModal';
import '@testing-library/jest-dom';


describe('AddModal', () => {
  test('renders the add modal correctly', () => {
    render(<AddModal />);

    const addEmployeeButton = screen.getByTestId('addEmployeeBtn');
    expect(addEmployeeButton).toBeInTheDocument();

    const modalContent = screen.queryByTestId('modalContent');
    expect(modalContent).toBe(null);

    fireEvent.click(addEmployeeButton);

    // Check if the modal content becomes visible
    expect(modalContent).toBe(null);

    // Check if the modal title is correct
    const modalTitle = screen.getByTestId('title');
    expect(modalTitle).toHaveTextContent('Ажилтан нэмэх');

    // Check if the submit button is rendered
    const submitButton = screen.getByTestId('SubmitBtn');
    expect(submitButton).toBeInTheDocument();

    // Check if the arrow icon is rendered within the submit button
    const arrowIcon = screen.getByTestId('arrow-icon');
    expect(arrowIcon).toBeInTheDocument();
  });
});
