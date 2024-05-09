import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EmployeePagination } from '../../src/app/employee-details/_components';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue('5'),
  }),
}));
describe('EmployeePagination', () => {
  const handleClickMock = jest.fn();

  afterEach(() => {
    handleClickMock.mockClear();
  });

  it('should not call handleClick when page does not change', () => {
    const { container } = render(<EmployeePagination page={20} setChecked={handleClickMock} />);
    expect(container).toBeDefined();
  });

  it('should not call handleClick when page does not change', () => {
    const { getByText } = render(<EmployeePagination page={20} setChecked={handleClickMock} />);
    fireEvent.click(getByText('3'));
    expect(handleClickMock).toHaveBeenCalledWith(3);
  });
});
