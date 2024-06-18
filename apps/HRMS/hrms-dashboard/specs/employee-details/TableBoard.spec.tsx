import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableDemo, invoices } from '../../src/app/employee-details/_components/TableBoard';

describe('Table components', () => {
  it('should render table components correctly', () => {
    render(<TableDemo />);
    const tableContent = screen.getByTestId('content');
    expect(tableContent).toBeInTheDocument();

    for (let i = 1; i <= 5; i++) {
      const head = screen.getByTestId(`tableHead-${i}`);
      expect(head).toBeInTheDocument();
    }

    invoices.forEach((_, index) => {
      const tableContentBody = screen.getByTestId(`TableContent-${index}`);
      expect(tableContentBody).toBeInTheDocument();

      for (let i = 1; i <= 5; i++) {
        const bodyData = screen.getByTestId(`tableCell-${i}-${index}`);
        expect(bodyData).toBeInTheDocument();
      }
    });
  });
});
