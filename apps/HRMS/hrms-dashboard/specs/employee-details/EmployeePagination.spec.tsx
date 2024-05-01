import React from 'react';
import { EmployeePagination } from '../../src/app/employee-details/_components';
import { fireEvent, render } from '@testing-library/react';

describe('employee pagination component', () => {
  const props = {
    pageCount: 2,
    handleClick: jest.fn(),
  };

  it('pagination component render ', () => {
    const { getByTestId } = render(<EmployeePagination {...props} />);
    const pagination = getByTestId('pagination');
    expect(pagination).toBeDefined();
  });

  it('decrements checked when previous button is clicked', () => {
    const { getByTestId } = render(<EmployeePagination {...props} />);
    const prevButton = getByTestId('before-button');
    expect(prevButton).toBeDefined();
    fireEvent.click(prevButton);
    expect(props.handleClick).toHaveBeenCalledWith(1);
  });

  it('increments checked when next button is clicked', () => {
    const { getByTestId } = render(<EmployeePagination {...props} />);
    const nextButton = getByTestId('after-button');
    fireEvent.click(nextButton);
    expect(props.handleClick).toHaveBeenCalledWith(2);
    const prevButton = getByTestId('before-button');
    fireEvent.click(prevButton);
    expect(props.handleClick).toHaveBeenCalledWith(1);
  });

  it('page button click', () => {
    const { getByTestId } = render(<EmployeePagination {...props} />);
    const pageButton = getByTestId('page-button-2');
    expect(pageButton).toBeDefined();
    fireEvent.click(pageButton);
    expect(props.handleClick).toHaveBeenCalledWith(2);
    const nextButton = getByTestId('after-button');
    fireEvent.click(nextButton);
    expect(props.handleClick).toHaveBeenCalledWith(2);
  });
});
