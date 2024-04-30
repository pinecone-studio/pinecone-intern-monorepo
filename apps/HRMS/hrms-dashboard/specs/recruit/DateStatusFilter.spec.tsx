import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StatusFilter, DateFilter } from '../../src/app/recruiting/_components'; // Import your components

describe('StatusFilter Component', () => {
  it('should render a filter', () => {
    render(<StatusFilter />);
  });

  it('should update', () => {
    const { getByText } = render(<StatusFilter />);
    const select = getByText('Төлөв'); // Material-UI's Select is wrapped in a button
    fireEvent.mouseDown(select);
    const dateOption = getByText('Draft');
    fireEvent.click(dateOption);
    expect(select.textContent).toContain('Төлөв');
  });
});

describe('DateFilter Component', () => {
  it('should render a filter', () => {
    render(<DateFilter />);
  });

  it('should update', () => {
    const { getByText } = render(<DateFilter />);
    const select = getByText('Огноо'); // Material-UI's Select is wrapped in a button
    fireEvent.mouseDown(select);
    const dateOption = getByText('4/30 - Мягмар');
    fireEvent.click(dateOption);
    expect(select.textContent).toContain('Огноо');
  });
});
