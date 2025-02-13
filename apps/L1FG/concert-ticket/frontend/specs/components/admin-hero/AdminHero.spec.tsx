import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminTable } from '../../../src/components/adminHero/AdminHero';
import '@testing-library/jest-dom';

describe('AdminTable Component', () => {
  it('displays the "Admin Search" header', () => {
    render(<AdminTable />);
    expect(screen.getByText('Admin Search')).toBeInTheDocument();
    expect(screen.getByText('Admin Search')).toHaveClass('text-black');
  });

  it('has a table container with correct dimensions and styling', () => {
    const { container } = render(<AdminTable />);
    const tableWrapper = container.querySelector('.w-\\[1200px\\]');

    expect(tableWrapper).toBeInTheDocument();
    expect(tableWrapper).toHaveClass('h-[800px]');
    expect(tableWrapper).toHaveClass('border');
    expect(tableWrapper).toHaveClass('rounded-[6px]');
    expect(tableWrapper).toHaveClass('bg-[#FFFFFF]');
  });

  it('renders all expected table headers', () => {
    render(<AdminTable />);
    const headers = screen.getAllByRole('columnheader');

    expect(headers).toHaveLength(10);
    expect(headers[0]).toHaveTextContent('Онцлох');
    expect(headers[1]).toHaveTextContent('Тоглолтын нэр');
    expect(headers[2]).toHaveTextContent('Артист');
    expect(headers[3]).toHaveTextContent('Нийт тоо');
    expect(headers[4]).toHaveTextContent('VIP');
    expect(headers[5]).toHaveTextContent('Regular');
    expect(headers[6]).toHaveTextContent('Задгай');
    expect(headers[7]).toHaveTextContent('Тоглох өдрүүд');
    expect(headers[8]).toHaveTextContent('Нийт ашиг');
    expect(headers[9]).toHaveTextContent('Үйлдэл');
  });

  it('shows an empty table body initially', () => {
    const { container } = render(<AdminTable />);
    const tableBody = container.querySelector('tbody');
    expect(tableBody?.children).toHaveLength(0);
  });
});
