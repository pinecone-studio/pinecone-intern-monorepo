import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaginationDemo } from '../../src/app/employee-details/_components/Pagination';
describe('PaginationDemo component', () => {
  test('renders pagination items correctly', () => {
    render(<PaginationDemo />);

    const container = screen.getByTestId('pagination-container');
    expect(container).toBeInTheDocument();

    const PaginationContent = screen.getByTestId('container');
    expect(PaginationContent).toBeInTheDocument();

    const PreviousBtn = screen.getByTestId('pagination-previous');
    expect(PreviousBtn).toBeInTheDocument();

    const NextBtn = screen.getByTestId('pagination-next');
    expect(NextBtn).toBeInTheDocument();

    for (let i = 1; i <= 6; i++) {
      const PaginationLink = screen.getByTestId(`pagination-link-${i}`);
      expect(PaginationLink).toBeInTheDocument();
    }
  });
});
