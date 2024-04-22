import React from 'react';
import { EmployeePagination } from '../../src/app/employee-details/_components';
import { fireEvent, render } from '@testing-library/react';

describe('render', () => {
  it('hhe', () => {
    const { container, getByTestId } = render(<EmployeePagination />);
    expect(container).toBeDefined();

    const beforeButton = getByTestId('NavigateBeforeIcon');
    fireEvent.click(beforeButton);

    const nextButton = getByTestId('NavigateNextIcon');
    fireEvent.click(nextButton);

    const pageButton = getByTestId('page-button');
    fireEvent.click(pageButton);
  });
});
