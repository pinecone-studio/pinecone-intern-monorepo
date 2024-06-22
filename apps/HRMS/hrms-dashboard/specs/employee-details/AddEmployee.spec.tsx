import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AddEmployee } from '../../src/app/employee-details/_components/modal/AddEmployee';
describe('button component', () => {
  test('renders AddEmployee component', () => {
    render(<AddEmployee />);
    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();

    const addButton = screen.getByText('Ажилтан нэмэх');
    expect(addButton).toBeDefined();
  });
});
