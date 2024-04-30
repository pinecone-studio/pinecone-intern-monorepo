import React from 'react';
import { EmployeePagination } from '../../src/app/employee-details/_components';
import { fireEvent, render } from '@testing-library/react';

describe('employee pagination component', () => {
  const props = {
    paginationPageCount: 5,
    handleClick: jest.fn(),
    searchPath: '1',
  };

  it('pagination component render and click', () => {
    const { container, getByTestId } = render(<EmployeePagination {...props} />);
    expect(container).toBeDefined();

    const beforeButton = getByTestId('NavigateBeforeIcon');
    fireEvent.click(beforeButton);

    const nextButton = getByTestId('NavigateNextIcon');
    fireEvent.click(nextButton);

    const pageButton = getByTestId('page-button');
    expect(pageButton.getAttribute('count')).toBeDefined();
    fireEvent.click(pageButton);
  });
});
